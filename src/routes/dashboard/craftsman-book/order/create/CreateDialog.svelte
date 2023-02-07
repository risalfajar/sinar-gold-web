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
    import {triggerModal} from "$lib/common/ui/dialog/modalUtils"
    import {craftsmans, salesmans} from "$lib/stores.js"
    import {createRender, createTable} from "svelte-headless-table"
    import {writable} from "svelte/store"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import PhotoIcon from "./PhotoIcon.svelte"
    import TableActions from "$lib/common/ui/table/TableActions.svelte"
    import {getRowData} from "$lib/common/utils/tableUtils"
    import {OrderMaterial} from "../data/material"
    import AddMaterialDialog from "./AddMaterialDialog.svelte"
    import {sumBy} from "lodash-es"
    import {removeIndex} from "$lib/common/utils/arrayUtils"
    import {OrderModel} from "../data/model"
    import CraftsmanOrderRepository from "../data/repository"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"

    const title = 'Buat Pesanan Tukang'
    const repository = new CraftsmanOrderRepository()
    const data: CraftsmanOrder = {
        id: generateNumberId(8),
        craftsman: "",
        salesman: {
            code: '',
            name: ''
        },
        models: [],
        materials: []
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
                .on('delete', () => data.models = removeIndex(data.models, cell.row.id))
        })
    ])

    const materials = writable<OrderMaterial[]>()
    const materialsTable = createTable(materials)
    const materialsColumns = materialsTable.createColumns([
        materialsTable.column({
            accessor: 'rate',
            header: 'Kadar'
        }),
        materialsTable.column({
            accessor: 'goldWeight',
            header: 'Berat Emas'
        }),
        materialsTable.column({
            accessor: 'sampleWeight',
            header: 'Berat Contoh',
        }),
        materialsTable.column({
            accessor: 'jewelWeight',
            header: 'Berat Permata'
        }),
        materialsTable.display({
            id: 'actions',
            header: 'Actions',
            cell: (cell, state) => createRender(TableActions)
                .on('edit', () => openAddMaterialDialog(getRowData(state, cell)))
                .on('delete', () => data.materials = removeIndex(data.materials, cell.row.id))
        })
    ])

    let salesmanNames = $salesmans.map(it => it.name)
    let isFormValid: boolean
    let editedIndex: number | undefined
    let isLoading = false

    $: models.set(data.models)
    $: materials.set(data.materials)
    $: isFormValid = data.salesman.code.length > 0
        && data.craftsman.length > 0
        && data.models.length > 0
        && data.materials.length > 0

    function openAddModelDialog(arg?: OrderModel) {
        editedIndex = arg && data.models.findIndex(it => it === arg)
        triggerModal({
            type: 'component',
            component: {
                ref: AddModelDialog,
                props: arg && {data: arg}
            },
            response: (r: OrderModel) => {
                if (!r) return
                if (editedIndex != null)
                    data.models[editedIndex] = r
                else
                    data.models.push(r)
                data.models = data.models
            }
        })
    }

    function openAddMaterialDialog(arg?: OrderMaterial) {
        editedIndex = arg && data.materials.findIndex(it => it === arg)
        triggerModal({
            type: 'component',
            component: {
                ref: AddMaterialDialog,
                props: arg && {data: arg}
            },
            response: (r: OrderMaterial) => {
                if (!r) return
                if (editedIndex != null)
                    data.materials[editedIndex] = r
                else
                    data.materials.push(r)
                data.materials = data.materials
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
            await repository.save(data)
            successToast('Berhasil membuat pesanan')
            modalStore.close()
        } catch (err) {
            console.error(err)
            errorToast('Gagal membuat pesanan')
        }
        isLoading = false
    }
</script>

<div>
    <ModalTitle showCloseButton={!isLoading} {title} on:close={close}/>
    <div class="py-2 space-y-4 max-h-[75vh] overflow-y-auto">
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
            <Button class="btn-filled-primary w-full" on:click={() => openAddModelDialog()}>
                <i class="material-icons">add</i>
                Tambah Model
            </Button>
            <DataTable model={modelsTable.createViewModel(modelsColumns)} emptyText="Silahkan menambahkan model">
                <tr class=" border-t border-t-primary-500">
                    <td colspan="2"></td>
                    <td class="text-center">Total Item</td>
                    <td class="text-center">{sumBy(data.models, (it => it.quantity))}</td>
                </tr>
            </DataTable>
        </div>

        <!--    Materials    -->
        <hr/>
        <div class="space-y-2">
            <Button class="btn-filled-primary w-full" on:click={() => openAddMaterialDialog()}>
                <i class="material-icons">add</i>
                Tambah Bahan
            </Button>
            <DataTable model={materialsTable.createViewModel(materialsColumns)} emptyText="Silahkan menambahkan bahan">
                <tr class="font-bold border-t border-t-primary-500">
                    <td class="text-center">Total Bahan</td>
                    <td class="text-center">{sumBy(data.materials, (it => it.goldWeight))}</td>
                    <td class="text-center">{sumBy(data.materials, (it => it.sampleWeight))}</td>
                    <td class="text-center">{sumBy(data.materials, (it => it.jewelWeight))}</td>
                </tr>
            </DataTable>
        </div>

        <hr/>
        <Button class="btn-filled-secondary w-full" disabled={!isFormValid} {isLoading} on:click={save}>Buat Pesanan</Button>
    </div>
</div>
