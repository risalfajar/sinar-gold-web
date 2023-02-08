<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import CreateDialog from "./create/CreateDialog.svelte"
    import {craftsmans, salesmans} from "$lib/stores.js"
    import {derived, writable} from "svelte/store"
    import CraftsmanOrderRepository from "./data/repository"
    import {createRender, createTable} from "svelte-headless-table"
    import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import TableActions from "$lib/common/ui/table/TableActions.svelte"
    import {sumBy} from "lodash-es"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {getRowData} from "$lib/common/utils/tableUtils"
    import {CraftsmanOrder} from "./data/order"
    import {deleteConfirmationModal, triggerModal} from "$lib/common/utils/modalUtils"
    import DetailsDialog from "./details/DetailsDialog.svelte"

    const craftsman = writable('')
    const salesman = writable('')
    const startDate = writable(new Date())
    const endDate = writable(new Date())
    const data = derived([craftsman, salesman, startDate, endDate], (values, set) => {
        const craftsman = values[0].length > 0 ? values[0] : undefined
        const salesman = values[1].length > 0 ? values[1] : undefined
        const start = values[2]
        const end = values[3]
        const repository = new CraftsmanOrderRepository(salesman, craftsman)
        return repository.listenByDate(start, end, items => set(items))
    }, [])

    const table = createTable(data, {
        sort: addSortBy({initialSortKeys: [{id: 'created', order: 'desc'}]}),
        tableFilter: addTableFilter()
    })
    const columns = table.createColumns([
        table.column({
            id: 'created',
            header: 'Tanggal Pesan',
            accessor: (item) => item.created?.toLocaleDateString()
        }),
        table.column({
            header: 'Nomor Pesanan',
            accessor: 'id'
        }),
        table.column({
            id: 'salesman',
            header: 'Nama Sales',
            accessor: (item) => item.salesman.name
        }),
        table.column({
            header: 'Nama Tukang',
            accessor: 'craftsman'
        }),
        table.column({
            id: 'quantity',
            header: 'Jumlah Item',
            accessor: (item) => item.models.length
        }),
        table.column({
            id: 'rate',
            header: 'Kadar Bahan',
            accessor: (item) => item.material.rate
        }),
        table.column({
            id: 'goldWeight',
            header: 'Berat Emas',
            accessor: (item) => item.material.goldWeight
        }),
        table.column({
            id: 'jewelWeight',
            header: 'Berat Permata',
            accessor: (item) => item.material.jewelWeight
        }),
        table.column({
            id: 'sampleWeight',
            header: 'Berat Contoh',
            accessor: (item) => item.material.sampleWeight
        }),
        table.display({
            id: 'actions',
            header: 'Actions',
            cell: (cell, state) => createRender(TableActions, {showEditButton: false})
                .on('delete', () => openDeleteConfirmationDialog(getRowData(state, cell)))
        })
    ])
    const viewModel = table.createViewModel(columns)

    let isLoading = false

    function openCreateDialog() {
        const dialog: ModalSettings = {
            type: 'component',
            component: {
                ref: CreateDialog
            },
            meta: {mandatory: true}
        }
        modalStore.trigger(dialog)
    }

    function openDeleteConfirmationDialog(item: CraftsmanOrder) {
        triggerModal({
            ...deleteConfirmationModal,
            body: `Apakah kamu yakin ingin menghapus pesanan ${item.id}?`,
            response: (r) => r && deleteItem(item.id),
        })
    }

    async function deleteItem(id: string) {
        isLoading = true
        const repository = new CraftsmanOrderRepository()
        try {
            await repository.delete(id)
            successToast('Berhasil menghapus pesanan')
        } catch (err) {
            console.error(err)
            errorToast('Gagal menghapus pesanan')
        }
        isLoading = false
    }
</script>

<TableContainer>
    <svelte:fragment slot="search">
        <Select label="Tukang" options={$craftsmans} bind:value={$craftsman}/>
        <Select label="Sales" options={$salesmans.map(it => it.name)} values={$salesmans.map(it => it.code)} bind:value={$salesman}/>
        <DateRangePicker label="Tanggal" bind:start={$startDate} bind:end={$endDate}/>
    </svelte:fragment>
    <Button class="btn-filled-primary" slot="buttons" on:click={openCreateDialog}>Buat Pesanan</Button>

    <DataTable model={viewModel} clickable {isLoading}>
        <tr class="border-t border-t-primary-500">
            <td colspan="5"></td>
            <th class="">Grand Total</th>
            <th class="">{sumBy($data, (item) => item.material.goldWeight).toFixed(2)}</th>
            <th class="">{sumBy($data, (item) => item.material.jewelWeight).toFixed(2)}</th>
            <th class="">{sumBy($data, (item) => item.material.sampleWeight).toFixed(2)}</th>
        </tr>
    </DataTable>
</TableContainer>
