<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
    import {craftsmans, salesmans} from "$lib/stores.js"
    import {derived, Readable, writable} from "svelte/store"
    import {createTable} from "svelte-headless-table"
    import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {OrderDeposit} from "../order/data/deposit"
    import DepositRepository from "../order/data/source/depositRepository"
    import {CraftsmanOrder} from "../order/data/order"
    import {LOCALE_INDONESIA} from "$lib/constants"
    import {triggerModal} from "$lib/common/utils/modalUtils"
    import DetailsDialog from "./DetailsDialog.svelte"

    const craftsman = writable('')
    const salesman = writable('')
    const startDate = writable(new Date())
    const endDate = writable(new Date())
    const data: Readable<OrderDeposit[]> = derived([craftsman, salesman, startDate, endDate], (values, set) => {
        const craftsman = values[0].length > 0 ? values[0] : undefined
        const salesman = values[1].length > 0 ? values[1] : undefined
        const start = values[2]
        const end = values[3]
        const repository = new DepositRepository(undefined, salesman, craftsman)
        return repository.listenByDate(start, end, items => set(items))
    }, [])

    const table = createTable(data, {
        sort: addSortBy({initialSortKeys: [{id: 'created', order: 'desc'}]}),
        tableFilter: addTableFilter()
    })
    const columns = table.createColumns([
        table.column({
            id: 'orderDate',
            header: 'Tanggal Pesan',
            accessor: (item) => item.order.created!.toLocaleDateString(LOCALE_INDONESIA)
        }),
        table.column({
            id: 'created',
            header: 'Tanggal Setor',
            accessor: (item) => item.created!.toLocaleDateString(LOCALE_INDONESIA)
        }),
        table.column({
            id: 'orderId',
            header: 'Nomor Pesanan',
            accessor: (item) => item.order.id
        }),
        table.column({
            id: 'salesman',
            header: 'Nama Sales',
            accessor: (item) => item.order.salesman.name
        }),
        table.column({
            id: 'craftsman',
            header: 'Nama Tukang',
            accessor: (item) => item.order.craftsman
        }),
        table.column({
            id: 'model',
            header: 'Nama Model',
            accessor: (item) => item.model.details
        }),
        table.column({
            id: 'sourceWeight',
            header: 'Berat Bahan Emas',
            accessor: (item) => item.order.material.goldWeight + ' gram'
        }),
        table.column({
            id: 'finishedWeight',
            header: 'Berat Emas Jadi',
            accessor: (item) => item.finishedMaterial.goldWeight + ' gram'
        }),
        table.column({
            id: 'goldWeightGap',
            header: 'Selisih Berat Emas',
            accessor: (item) => item.goldWeightGap + ' gram'
        }),
        table.column({
            id: 'laborCost',
            header: 'Ongkos Kerja',
            accessor: (item) => item.laborCost + ' gram'
        }),
        table.column({
            id: 'pricePerGram',
            header: 'Harga/gram',
            accessor: (item) => item.pricePerGram.toLocaleString(LOCALE_INDONESIA)
        }),
        table.column({
            id: 'totalCost',
            header: 'Total Ongkos',
            accessor: (item) => item.totalCost.toLocaleString(LOCALE_INDONESIA)
        }),
    ])

    function openDetailsDialog(item: CraftsmanOrder) {
        triggerModal({
            type: 'component',
            component: {
                ref: DetailsDialog,
                props: {data: item}
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

    <DataTable model={table.createViewModel(columns)} clickable on:click={(e) => openDetailsDialog(e.detail)}/>
</TableContainer>
