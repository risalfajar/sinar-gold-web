<script lang="ts">
    import BaseInfoDialog from "$lib/common/ui/dialog/BaseInfoDialog.svelte"
    import {OrderDeposit} from "../order/data/deposit"
    import DataText from "$lib/common/ui/text/DataText.svelte"
    import {LOCALE_INDONESIA} from "$lib/constants.js"

    export let data: OrderDeposit
</script>

<BaseInfoDialog>
    <h5>Rincian Pesanan Jadi</h5>
    <div class="grid grid-cols-2 gap-4">
        <DataText title="Tanggal Setor" content={data.created.toLocaleDateString(LOCALE_INDONESIA, {dateStyle: 'long'})}/>
        <DataText title="Nomor Pesanan" content={data.order.id}/>
        <DataText title="Nama Tukang" content={data.order.craftsman}/>
        <DataText title="Nama Sales" content={data.order.salesman.name}/>
        <DataText title="Nama Model" content={data.model.details}/>
        <DataText title="Ukuran" content={data.model.size}/>
    </div>

    <p>Foto Pesanan Jadi</p>
    <img class="w-full" alt="Foto Pesanan" src={data.photoUrl}/>

    <div class="grid grid-cols-2 gap-4">
        <DataText title="Kadar" content={data.finishedMaterial.rate}/>
        <DataText title="Berat Permata" content="{data.finishedMaterial.jewelWeight} gram"/>
        <DataText title="Berat Contoh" content="{data.finishedMaterial.sampleWeight} gram"/>
        <DataText title="Berat Emas Jadi" content="{data.finishedMaterial.goldWeight} gram"/>
        <DataText title="Berat Bahan Emas" content="{data.order.material.goldWeight} gram"/>
        <DataText title="Selisih Bahan Emas" content="{data.goldWeightGap} gram"/>
        <DataText title="Ongkos Kerja" content="{data.laborCost} gram"/>
        <DataText title="Harga/gram" content={data.pricePerGram.toLocaleString(LOCALE_INDONESIA)}/>
        <DataText title="Total Ongkos" content={data.totalCost.toLocaleString(LOCALE_INDONESIA)}/>
    </div>
</BaseInfoDialog>
