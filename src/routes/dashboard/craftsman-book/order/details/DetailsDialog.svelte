<script lang="ts">
    import DataText from "$lib/common/ui/text/DataText.svelte"
    import {CraftsmanOrder} from "../data/order"
    import {LOCALE_INDONESIA} from "$lib/constants.js"
    import {readable, Readable} from "svelte/store"
    import {OrderModel} from "../data/model"
    import {createRender, createTable} from "svelte-headless-table"
    import PhotoIcon from "../create/PhotoIcon.svelte"
    import TableActions from "$lib/common/ui/table/TableActions.svelte"
    import {getRowData} from "$lib/common/utils/tableUtils"
    import {triggerModal} from "$lib/common/utils/modalUtils"
    import EditModelDialog from "../create/EditModelDialog.svelte"
    import CraftsmanOrderModelRepository from "../data/source/modelRepository"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import FinishButton from "./FinishButton.svelte"
    import IconButton from "$lib/common/ui/button/IconButton.svelte"
    import {deleteConfirmationModal} from "$lib/common/utils/modalUtils.js"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import Button from "$lib/common/ui/button/Button.svelte"
    import CreateAdvanceDialog from "./CreateAdvanceDialog.svelte"
    import CashAdvanceRepository from "../data/source/advanceRepository"
    import {CashAdvance} from "../data/advance"
    import {sumBy} from "lodash-es"
    import AddMaterialDialog from "./AddMaterialDialog.svelte"
    import AddDepositDialog from "./AddDepositDialog.svelte"
    import DepositRepository from "../data/source/depositRepository"
    import {OrderDeposit} from "../data/deposit"
    import BaseInfoDialog from "$lib/common/ui/dialog/BaseInfoDialog.svelte"

    export let data: Readable<CraftsmanOrder>

    const modelRepository = new CraftsmanOrderModelRepository($data.id)
    const cashAdvanceRepository = new CashAdvanceRepository($data.id)
    const depositRepository = new DepositRepository($data.id)

    const models = readable<OrderModel[]>([], set => modelRepository.listenAll(set))
    const modelsTable = createTable(models)
    const modelsColumns = modelsTable.createColumns([
        modelsTable.column({
            accessor: 'size',
            header: 'Ukuran'
        }),
        modelsTable.column({
            accessor: 'details',
            header: 'Rincian Model'
        }),
        modelsTable.column({
            header: 'Gambar Model',
            accessor: 'photoUrl',
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
                .on('edit', () => openEditModelDialog(getRowData(state, cell)))
                .on('delete', () => confirmDeleteModel(getRowData(state, cell)))
        }),
        modelsTable.column({
            header: 'Setor',
            accessor: 'isFinished',
            cell: (cell, state) => createRender(FinishButton, {disabled: cell.value})
                .on('click', () => openAddDepositDialog(getRowData(state, cell)))
        })
    ])

    const advances = readable<CashAdvance[]>([], set => cashAdvanceRepository.listenAll(set))
    const advancesTable = createTable(advances)
    const advancesColumns = advancesTable.createColumns([
        advancesTable.column({
            id: 'created',
            header: 'Tanggal',
            accessor: (item) => item.created?.toLocaleDateString(LOCALE_INDONESIA, {dateStyle: 'long'})
        }),
        advancesTable.column({
            id: 'amount',
            header: 'Jumlah Kasbon',
            accessor: (item) => item.amount.toLocaleString(LOCALE_INDONESIA)
        })
    ])

    const deposits = readable<OrderDeposit[]>([], set => depositRepository.listenAll(set))
    const depositsTable = createTable(deposits)
    const depositsColumns = depositsTable.createColumns([
        depositsTable.column({
            header: 'Ukuran',
            id: 'size',
            accessor: (item) => item.model.size
        }),
        depositsTable.column({
            header: 'Rincian Model',
            id: 'details',
            accessor: (item) => item.model.details
        }),
        depositsTable.column({
            header: 'Gambar Jadi',
            accessor: 'photoUrl',
            cell: cell => createRender(PhotoIcon, {photo: cell.value})
        }),
        depositsTable.column({
            header: 'Berat Jadi',
            id: 'finishedWeight',
            accessor: (item) => item.finishedMaterial.goldWeight + ' gram'
        }),
        depositsTable.column({
            header: 'Total Ongkos Kerja',
            id: 'totalCost',
            accessor: (item) => item.totalCost.toLocaleString(LOCALE_INDONESIA)
        }),
    ])

    let isDeletingModel = false

    function openEditModelDialog(arg: OrderModel) {
        triggerModal({
            type: 'component',
            component: {
                ref: EditModelDialog,
                props: {data: arg}
            },
            response: (r: OrderModel) => {
                r && updateModel(r)
            }
        })
    }

    async function updateModel(model: OrderModel) {
        await modelRepository.save(model)
    }

    function confirmDeleteModel(model: OrderModel) {
        triggerModal({
            ...deleteConfirmationModal,
            body: `Anda yakin ingin menghapus model ${model.details}?`,
            response: (r) => r && deleteModel(model)
        })
    }

    async function deleteModel(model: OrderModel) {
        isDeletingModel = true
        try {
            await modelRepository.delete(model.id)
            successToast('Berhasil menghapus model')
        } catch (err) {
            console.error(err)
            errorToast('Gagal menghapus model')
        }
        isDeletingModel = false
    }

    function openCreateAdvanceDialog() {
        triggerModal({
            type: 'component',
            component: {
                ref: CreateAdvanceDialog,
                props: {orderId: $data.id}
            },
            title: 'Buat Kasbon',
            modalClasses: '!max-w-[480px]'
        })
    }

    function openAddMaterialDialog() {
        triggerModal({
            type: 'component',
            component: {
                ref: AddMaterialDialog,
                props: {arg: $data}
            }
        })
    }

    function openAddDepositDialog(model: OrderModel) {
        triggerModal({
            type: 'component',
            component: {
                ref: AddDepositDialog,
                props: {
                    order: $data,
                    model,
                    advances
                }
            },
            meta: {mandatory: true}
        })
    }
</script>

<BaseInfoDialog>
    <div class="grid grid-cols-2 gap-4">
        <DataText title="Tanggal Pesan" content={$data.created?.toLocaleDateString(LOCALE_INDONESIA, {dateStyle: 'long'})}/>
        <DataText title="Nomor Pesanan" content={$data.id}/>
        <DataText title="Nama Tukang" content={$data.craftsman}/>
        <DataText title="Nama Sales" content={$data.salesman.name}/>
    </div>

    <h5>Rincian Model</h5>
    <DataTable model={modelsTable.createViewModel(modelsColumns)} class="!overflow-x-visible" isLoading={isDeletingModel}/>

    <h5>Rincian Bahan</h5>
    <div class="border rounded-lg">
        <table>
            <tr>
                <th>Kadar</th>
                <th>Berat Emas</th>
                <th>Berat Contoh</th>
                <th>Berat Permata</th>
                <th>Tambah Berat</th>
            </tr>
            <tr>
                <td>{$data.material.rate}</td>
                <td>{$data.material.goldWeight}</td>
                <td>{$data.material.sampleWeight}</td>
                <td>{$data.material.jewelWeight}</td>
                <td>
                    <IconButton class="variant-ringed-surface" on:click={openAddMaterialDialog}>
                        <i class="material-icons text-primary-500">add</i>
                    </IconButton>
                </td>
            </tr>
        </table>
    </div>

    <h5>Riwayat Kasbon</h5>
    <DataTable model={advancesTable.createViewModel(advancesColumns)} class="!overflow-x-visible">
        <tr>
            <th>Grand Total</th>
            <th>{sumBy($advances, (item) => item.amount).toLocaleString(LOCALE_INDONESIA)}</th>
        </tr>
    </DataTable>

    <h5>Riwayat Setor</h5>
    <DataTable model={depositsTable.createViewModel(depositsColumns)} class="!overflow-x-visible"/>

    <Button class="w-fit self-end variant-filled-secondary" on:click={openCreateAdvanceDialog}>Buat Kasbon</Button>
</BaseInfoDialog>
