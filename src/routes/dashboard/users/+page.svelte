<script lang="ts">
    import Container from "$lib/common/ui/container/Container.svelte"
    import ContainerTitle from "$lib/common/ui/container/ContainerTitle.svelte"
    import ContainerCard from "$lib/common/ui/container/ContainerCard.svelte"
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {get, readable, Readable, Subscriber} from "svelte/store"
    import {createRender, createTable} from "svelte-headless-table"
    import TableActions from "$lib/common/ui/table/TableActions.svelte"
    import {ModalComponent, ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {UserRepository} from "$lib/users/data/userRepository"
    import EditDialog from "./EditDialog.svelte"
    import {User} from "$lib/users/types/user"
    import {deleteConfirmationModal} from "$lib/common/utils/dialogUtils"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"

    const repository = new UserRepository()
    const data: Readable<User[]> = readable([], function start(set: Subscriber<User[]>) {
        return repository.listenAll(users => set(users ?? []))
    })

    const table = createTable(data, {
        sort: addSortBy({initialSortKeys: [{id: 'name', order: 'asc'}]}),
        tableFilter: addTableFilter()
    })
    const columns = table.createColumns([
        table.column({
            header: 'Nama Lengkap',
            accessor: 'name',
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
                .on('delete', () => showDeleteConfirmationDialog(get(state.data)[cell.row.id]))
        })
    ])
    const tableViewModel = table.createViewModel(columns)
    const {filterValue} = tableViewModel.pluginStates.tableFilter

    function openEditDialog(data?: User) {
        const component: ModalComponent = {
            ref: EditDialog,
            props: {data}
        }
        const dialog: ModalSettings = {
            type: 'component',
            component,
            classes: '!max-w-[480px]',
            title: `${data ? 'Edit' : 'Tambah'} Data Pengguna`
        }
        modalStore.trigger(dialog)
    }

    function showDeleteConfirmationDialog(user: User) {
        modalStore.trigger({
            ...deleteConfirmationModal,
            body: `Apakah kamu yakin ingin menghapus akun ${user.name}?`,
            response: (r) => r && deleteUser(user.username),
        })
    }

    async function deleteUser(username: string) {
        try {
            await repository.delete(username)
            successToast('Berhasil menghapus user')
        } catch (err) {
            console.error(err)
            errorToast('Gagal menghapus user')
        }
    }
</script>

<Container>
    <ContainerTitle slot="title" title="Manajemen User"/>
    <ContainerCard title="Data Pengguna">
        <TableContainer>
            <SearchInput slot="search" bind:value={$filterValue}/>
            <Button slot="buttons" class="btn-filled-primary" on:click={() => openEditDialog()}>Tambah Data</Button>
            <DataTable model={tableViewModel}/>
        </TableContainer>
    </ContainerCard>
</Container>
