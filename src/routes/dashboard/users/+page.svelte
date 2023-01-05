<script lang="ts">
    import Container from "$lib/ui/container/Container.svelte"
    import ContainerTitle from "$lib/ui/container/ContainerTitle.svelte"
    import ContainerCard from "$lib/ui/container/ContainerCard.svelte"
    import TableContainer from "$lib/ui/container/table/TableContainer.svelte"
    import SearchInput from "$lib/ui/form/SearchInput.svelte"
    import Button from "$lib/ui/button/Button.svelte"
    import {get, readable, Readable, Subscriber} from "svelte/store"
    import {createRender, createTable} from "svelte-headless-table"
    import TableActions from "$lib/ui/table/TableActions.svelte"
    import {ModalComponent, ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import DataTable from "$lib/ui/table/DataTable.svelte"
    import {UserRepository} from "./data/userRepository"
    import EditDialog from "./EditDialog.svelte"
    import {User} from "./types/user"
    import {deleteConfirmationModal} from "$lib/utils/dialogUtils"
    import {errorToast, successToast} from "$lib/utils/toastUtils"

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
                .on('delete', () => showDeleteConfirmationDialog(get(state.data)[cell.row.id]))
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
            <SearchInput slot="search"/>
            <Button slot="buttons" class="btn-filled-primary" on:click={() => openEditDialog()}>Tambah Data</Button>
            <DataTable model={table.createViewModel(columns)}/>
        </TableContainer>
    </ContainerCard>
</Container>
