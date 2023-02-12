<script lang="ts">
    import {readable, Readable} from "svelte/store"
    import {CraftsmanOrder} from "../dashboard/craftsman-book/order/data/order"
    import CraftsmanOrderModelRepository from "../dashboard/craftsman-book/order/data/source/modelRepository"
    import CashAdvanceRepository from "../dashboard/craftsman-book/order/data/source/advanceRepository"
    import DepositRepository from "../dashboard/craftsman-book/order/data/source/depositRepository"
    import {OrderModel} from "../dashboard/craftsman-book/order/data/model"
    import {createRender, createTable} from "svelte-headless-table"
    import PhotoIcon from "../dashboard/craftsman-book/order/create/PhotoIcon.svelte"
    import {CashAdvance} from "../dashboard/craftsman-book/order/data/advance"
    import {LOCALE_INDONESIA} from "$lib/constants"
    import {OrderDeposit} from "../dashboard/craftsman-book/order/data/deposit"
    import BaseInfoDialog from "$lib/common/ui/dialog/BaseInfoDialog.svelte"
    import DataText from "$lib/common/ui/text/DataText.svelte"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {sumBy} from "lodash-es"

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
        })
    ])

    const advances = readable<CashAdvance[]>([], set => cashAdvanceRepository.listenAll(set))
    const advancesTable = createTable(advances)
    const advancesColumns = advancesTable.createColumns([
        advancesTable.column({
            id: 'created',
            header: 'Tanggal',
            accessor: (item) => item.created!.toLocaleDateString(LOCALE_INDONESIA, {dateStyle: 'long'})
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
</script>

<BaseInfoDialog>
    <div class="grid grid-cols-2 gap-4">
        <DataText title="Tanggal Pesan" content={$data.created?.toLocaleDateString(LOCALE_INDONESIA, {dateStyle: 'long'})}/>
        <DataText title="Nomor Pesanan" content={$data.id}/>
        <DataText title="Nama Tukang" content={$data.craftsman}/>
        <DataText title="Nama Sales" content={$data.salesman.name}/>
    </div>

    <h5>Rincian Model</h5>
    <DataTable model={modelsTable.createViewModel(modelsColumns)} class="!overflow-x-visible"/>

    <h5>Rincian Bahan</h5>
    <div class="border rounded-lg">
        <table>
            <tr>
                <th>Kadar</th>
                <th>Berat Emas</th>
                <th>Berat Contoh</th>
                <th>Berat Permata</th>
            </tr>
            <tr>
                <td>{$data.material.rate}</td>
                <td>{$data.material.goldWeight}</td>
                <td>{$data.material.sampleWeight}</td>
                <td>{$data.material.jewelWeight}</td>
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
</BaseInfoDialog>
