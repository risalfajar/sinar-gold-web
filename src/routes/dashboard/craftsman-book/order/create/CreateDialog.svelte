<script lang="ts">
    import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {CraftsmanOrder} from "../data/order"
    import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
    import AddModelDialog from "./AddModelDialog.svelte"
    import {closeModal, triggerModal} from "$lib/common/utils/modalUtils"
    import {craftsmans, salesmans} from "$lib/stores.js"
    import {createRender, createTable} from "svelte-headless-table"
    import {writable} from "svelte/store"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import PhotoIcon from "./PhotoIcon.svelte"
    import TableActions from "$lib/common/ui/table/TableActions.svelte"
    import {getRowData} from "$lib/common/utils/tableUtils"
    import {sumBy} from "lodash-es"
    import {removeIndex} from "$lib/common/utils/arrayUtils"
    import {OrderModel} from "../data/model"
    import CraftsmanOrderRepository from "../data/repository"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
    import CraftsmanOrderModelRepository from "../data/modelRepository"

    const title = 'Buat Pesanan Tukang'
    const repository = new CraftsmanOrderRepository()
    const data: CraftsmanOrder = {
        id: generateNumberId(8),
        craftsman: "",
        salesman: {
            code: '',
            name: ''
        },
        modelCount: 0,
        material: {
            rate: '',
            goldWeight: 0,
            jewelWeight: 0,
            sampleWeight: 0
        }
    }

    const models = writable<OrderModel[]>([])
    const modelsTable = createTable(models)
    const modelsColumns = modelsTable.createColumns([
        modelsTable.column({
            id: 'size',
            accessor: 'size',
            header: 'Ukuran'
        }),
        modelsTable.column({
            id: 'details',
            accessor: 'details',
            header: 'Rincian Model'
        }),
        modelsTable.column({
            id: 'photo',
            header: 'Gambar Model',
            accessor: 'photoFile',
            cell: cell => createRender(PhotoIcon, {photo: cell.value})
        }),
        modelsTable.column({
            header: 'Jumlah',
            accessor: 'quantity'
        }),
        modelsTable.display({
            id: 'actions',
            header: 'Actions',
            cell: (cell, state) => createRender(TableActions)
                .on('edit', () => openAddModelDialog(getRowData(state, cell)))
                .on('delete', () => $models = removeIndex($models, cell.row.id))
        })
    ])

    let salesmanNames = $salesmans.map(it => it.name)
    let isFormValid: boolean
    let editedIndex: number | undefined
    let isLoading = false

    $: isFormValid = data.salesman.code.length > 0
        && data.craftsman.length > 0
        && data.material.rate.length > 0
        && $models.length > 0

    function openAddModelDialog(arg?: OrderModel) {
        editedIndex = arg && $models.findIndex(it => it === arg)
        triggerModal({
            type: 'component',
            component: {
                ref: AddModelDialog,
                props: arg && {data: arg}
            },
            response: (r: OrderModel) => {
                if (!r) return
                if (editedIndex != null)
                    $models[editedIndex] = r
                else
                    $models.push(r)
                $models = $models
            }
        })
    }

    function close() {
        if (confirm('Data yang diinput akan hilang, apakah Anda yakin?'))
            modalStore.close()
    }

    async function save() {
        isLoading = true
        try {
            const orderId = await repository.save(data)
            const modelRepository = new CraftsmanOrderModelRepository(orderId)
            await Promise.all($models.map(model => modelRepository.save(model)))
            successToast('Berhasil membuat pesanan')
            closeModal()
        } catch (err) {
            console.error(err)
            errorToast('Gagal membuat pesanan')
        }
        isLoading = false
    }
</script>
<div>
    <ModalTitle showCloseButton={!isLoading} {title} on:close={close}/>
    <div class="px-1 py-2 space-y-4 max-h-[75vh] overflow-y-auto">
        <div class="grid grid-cols-2 gap-2">
            <DatePicker label="Tanggal" disabled value={new Date()}/>
            <TextInput label="Nomor Pesanan" disabled value={data.id}/>
            <Select label="Tukang" options={$craftsmans} bind:value={data.craftsman}/>
            <Select label="Sales" options={salesmanNames} value={data.salesman.name}
                    on:input={(e) => data.salesman = $salesmans.find(it => it.name === e.target.value)}/>
        </div>

        <!--    Models    -->
        <hr/>
        <div class="space-y-2">
            <h5>Tambah Model</h5>
            <DataTable model={modelsTable.createViewModel(modelsColumns)} emptyText="Silahkan menambahkan model">
                <tr class=" border-t border-t-primary-500">
                    <td colspan="2"></td>
                    <td class="text-center">Total Item</td>
                    <td class="text-center">{sumBy($models, (it => it.quantity))}</td>
                </tr>
            </DataTable>
            <Button class="btn-filled-primary btn-sm w-full" on:click={() => openAddModelDialog()}>
                <i class="material-icons">add</i>
                Tambah Model
            </Button>
        </div>

        <!--    Materials    -->
        <hr/>
        <div class="space-y-2">
            <h5>Bahan</h5>
            <div class="grid grid-cols-2 gap-2">
                <TextInput label="Kadar" bind:value={data.material.rate}/>
                <WeightInput label="Berat Emas" bind:value={data.material.goldWeight}/>
                <WeightInput label="Berat Contoh" bind:value={data.material.sampleWeight}/>
                <WeightInput label="Berat Permata" bind:value={data.material.jewelWeight}/>
            </div>
        </div>

        <hr/>
        <Button class="btn-filled-secondary w-full" disabled={!isFormValid} {isLoading} on:click={save}>Buat Pesanan</Button>
    </div>
</div>
