<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
    import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import {craftsmans, salesmans} from "$lib/stores.js"
    import {derived, Readable, writable} from "svelte/store"
    import {createTable} from "svelte-headless-table"
    import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {sumBy} from "lodash-es"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {deleteConfirmationModal, triggerModal} from "$lib/common/utils/modalUtils"
    import {CraftsmanOrder} from "../order/data/order"
    import CraftsmanOrderRepository from "../order/data/source/orderRepository"
    import CreateDialog from "../order/create/CreateDialog.svelte"
    import DetailsDialog from "./DetailsDialog.svelte"
    import {LOCALE_INDONESIA} from "$lib/constants"

    const craftsman = writable('')
    const salesman = writable('')
    const startDate = writable(new Date())
    const endDate = writable(new Date())
    const data: Readable<CraftsmanOrder[]> = derived([craftsman, salesman, startDate, endDate], (values, set) => {
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
            accessor: (item) => item.created!.toLocaleDateString(LOCALE_INDONESIA)
        }),
        table.column({
            id: 'finished',
            header: 'Tanggal Selesai',
            accessor: (item) => item.finished?.toLocaleDateString() ?? '-'
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
            header: 'Jumlah Item',
            accessor: 'modelCount'
        }),
        table.column({
            id: 'goldWeight',
            header: 'Total Berat Bahan',
            accessor: (item) => item.material.goldWeight + ' gram'
        }),
        table.column({
            id: 'finishedWeight',
            header: 'Total Berat Jadi',
            accessor: (item) => item.finishedWeight + ' gram'
        }),
        table.column({
            id: 'totalCost',
            header: 'Total Ongkos Kerja',
            accessor: (item) => item.totalCost.toLocaleString(LOCALE_INDONESIA)
        }),
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

    function openDetailsDialog(item: CraftsmanOrder) {
        triggerModal({
            type: 'component',
            component: {
                ref: DetailsDialog,
                props: {data: derived(data, (data) => data.find(it => it.id === item.id))}
            }
        })
    }
</script>

<TableContainer>
    <svelte:fragment slot="search">
        <Select label="Tukang" options={$craftsmans} bind:value={$craftsman}/>
        <Select label="Sales" options={$salesmans.map(it => it.name)} values={$salesmans.map(it => it.code)} bind:value={$salesman}/>
        <DateRangePicker label="Tanggal" bind:start={$startDate} bind:end={$endDate}/>
    </svelte:fragment>

    <DataTable model={viewModel} clickable {isLoading} on:click={(e) => openDetailsDialog(e.detail)}>
        <tr class="border-t border-t-primary-500">
            <td colspan="5"></td>
            <th class="">Grand Total</th>
            <th class="">{sumBy($data, (item) => item.material.goldWeight).toFixed(2)}</th>
            <th class="">{sumBy($data, (item) => item.finishedWeight).toFixed(2)}</th>
            <th class="">{sumBy($data, (item) => item.totalCost).toLocaleString(LOCALE_INDONESIA)}</th>
        </tr>
    </DataTable>
</TableContainer>
