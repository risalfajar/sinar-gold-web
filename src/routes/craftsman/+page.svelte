<script lang="ts">
    import Container from "$lib/common/ui/container/Container.svelte"
    import ContainerTitle from "$lib/common/ui/container/ContainerTitle.svelte"
    import ContainerCard from "$lib/common/ui/container/ContainerCard.svelte"
    import {AppShell} from "@skeletonlabs/skeleton"
    import {derived, Readable, writable} from "svelte/store"
    import {CraftsmanOrder} from "../dashboard/craftsman-book/order/data/order"
    import CraftsmanOrderRepository from "../dashboard/craftsman-book/order/data/source/orderRepository"
    import {createTable} from "svelte-headless-table"
    import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
    import {triggerModal} from "$lib/common/utils/modalUtils"
    import DetailsDialog from "./DetailsDialog.svelte"
    import {currentUser} from "$lib/stores"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"

    const craftsman = derived(currentUser, (user) => user?.name)
    const startDate = writable(new Date())
    const endDate = writable(new Date())
    const data: Readable<CraftsmanOrder[]> = derived([craftsman, startDate, endDate], (values, set) => {
        const craftsman = values[0]
        const start = values[1]
        const end = values[2]
        const repository = new CraftsmanOrderRepository(undefined, craftsman)
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
            accessor: (item) => item.created!.toLocaleDateString()
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
    ])

    let isLoading = false

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

<AppShell>
    <div class="w-full h-full max-w-full max-h-full p-6">
        <Container>
            <ContainerTitle slot="title" title="Buku Tukang"/>
            <ContainerCard title="Pesanan Toko">
                <TableContainer>
                    <svelte:fragment slot="search">
                        <DateRangePicker label="Tanggal" bind:start={$startDate} bind:end={$endDate}/>
                    </svelte:fragment>
                    <DataTable model={table.createViewModel(columns)} clickable on:click={(e) => openDetailsDialog(e.detail)}/>
                </TableContainer>
            </ContainerCard>
        </Container>
    </div>
</AppShell>
