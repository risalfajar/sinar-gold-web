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

    export let data: Readable<CraftsmanOrder>

    const repository = new CraftsmanOrderModelRepository($data.id)
    const modelRepository = new CraftsmanOrderModelRepository($data.id)
    const models = readable<OrderModel[]>([], set => repository.listenAll(set))
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
                .on('delete', () => deleteModel(getRowData(state, cell)))
        }),
        modelsTable.display({
            id: 'finish',
            header: 'Setor',
            cell: (cell, state) => createRender(FinishButton)
                .on('click', () => {
                })
        })
    ])

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

    function deleteModel(model: OrderModel) {

    }
</script>

<div>
    <p class="unstyled w-full bg-primary-500 text-white text-center py-2">TOKO SINAR MAS</p>
    <div class="overflow-y-auto max-h-[75vh] p-4 flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
            <DataText title="Tanggal Pesan" content={$data.created.toLocaleDateString(LOCALE_INDONESIA, {dateStyle: 'long'})}/>
            <DataText title="Nomor Pesanan" content={$data.id}/>
            <DataText title="Nama Tukang" content={$data.craftsman}/>
            <DataText title="Nama Sales" content={$data.salesman.name}/>
        </div>

        <h5>Rincian Model</h5>
        <DataTable model={modelsTable.createViewModel(modelsColumns)} class="overflow-x-visible"/>

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
                        <IconButton class="btn-ringed-surface clickable">
                            <i class="material-icons text-primary-500">add</i>
                        </IconButton>
                    </td>
                </tr>
            </table>
        </div>

        <h5>Riwayat Kasbon</h5>

    </div>
</div>
