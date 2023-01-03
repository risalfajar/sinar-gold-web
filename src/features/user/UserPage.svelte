<script lang="ts">
    import Container from "src/lib/ui/container/Container.svelte"
    import ContainerTitle from "src/lib/ui/container/ContainerTitle.svelte"
    import ContainerCard from "src/lib/ui/container/ContainerCard.svelte"
    import TableContainer from "src/lib/ui/container/table/TableContainer.svelte"
    import SearchInput from "src/lib/ui/form/SearchInput.svelte"
    import Button from "src/lib/ui/button/Button.svelte"
    import {User} from "src/features/user/types/user"
    import {UserRepository} from "src/features/user/data/userRepository"
    import {get, readable, Readable, Subscriber} from "svelte/store"
    import {createRender, createTable} from "svelte-headless-table"
    import TableActions from "src/lib/ui/table/TableActions.svelte"
    import {ModalComponent, ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import EditDialog from "src/features/user/EditDialog.svelte"
    import DataTable from "src/lib/ui/table/DataTable.svelte"

    const repository = new UserRepository()
    const data: Readable<User[]> = readable([], function start(set: Subscriber<User[]>) {
        return repository.listenAll(users => set(users ?? []))
    })
    const table = createTable(data)
    const columns = table.createColumns([
        table.column({
            header: 'Nama Lengkap',
            accessor: 'name'
        }),
        table.column({
            header: 'Username',
            accessor: 'username'
        }),
        table.column({
            header: 'Role',
            accessor: 'role'
        }),
        table.display({
            id: 'actions',
            header: 'Actions',
            cell: (cell, state) => createRender(TableActions)
                .on('edit', () => openEditDialog(get(state.data)[cell.row.id]))
        })
    ])

    function openEditDialog(data?: User) {
        const component: ModalComponent = {
            ref: EditDialog,
            props: {data, background: 'bg-white'}
        }
        const dialog: ModalSettings = {
            type: 'component',
            component,
            classes: '!max-w-[480px]',
            title: `${data ? 'Edit' : 'Tambah'} Data Pengguna`
        }
        modalStore.trigger(dialog)
    }
</script>

<Container>
    <ContainerTitle slot="title" title="Manajemen User"/>
    <ContainerCard title="Data Pengguna">
        <TableContainer>
            <SearchInput slot="search"/>
            <Button slot="buttons" class="btn-filled-primary" on:click={() => openEditDialog()}>Tambah Data</Button>
            <DataTable model={table.createViewModel(columns)}/>
        </TableContainer>
    </ContainerCard>
</Container>
