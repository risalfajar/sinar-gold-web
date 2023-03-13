<script lang="ts">
	import BaseInfoDialog from "$lib/common/ui/dialog/BaseInfoDialog.svelte"
	import {Sales} from "./data/sales"
	import DataText from "$lib/common/ui/text/DataText.svelte"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import {sumBy} from "lodash-es"

	export let data: Sales

	$: goods = Object.values(data.goods)
</script>

<BaseInfoDialog>
    <DataText title="Nomor Faktur" content={data.id}/>
    <div class="grid grid-cols-2 gap-2">
        <DataText title="Tanggal Transaksi" content={data.createdAt.toLocaleString(LOCALE_INDONESIA, {dateStyle: 'long'})}/>
        <DataText title="Kode Sales" content={data.customer.salesmanCode}/>
        <DataText title="Jenis Customer" content={data.customer.type}/>
        <DataText title="Nama Customer" content={data.customer.name}/>
        <DataText title="No HP" content={data.customer.phoneNumber}/>
        <DataText title="Alamat" content={data.customer.address}/>
    </div>

    <hr class="divider"/>

    <table>
        <tr>
            <th class="text-start border-0">Item-Berat</th>
            <th class="border-0">Atribut</th>
            <th class="border-0">Harga</th>
        </tr>
        {#each Object.values(goods) as goods (goods.id)}
            <tr>
                <td class="text-start">
                    {goods.name}-{goods.weight}gr
                    <br/>
                    {goods.id}
                </td>
                <td>{goods.attribute.name}</td>
                <td>Rp {goods.price.total.toLocaleString(LOCALE_INDONESIA)}</td>
            </tr>
        {/each}
        <tr>
            <td colspan="3">
                <hr class="divider"/>
            </td>
        </tr>
        <tr>
            <th colspan="2" class="text-start border-0">Total Bayar</th>
            <th colspan="1" class="border-0">Rp {sumBy(goods, (it) => it.price.total).toLocaleString(LOCALE_INDONESIA)}</th>
        </tr>
    </table>


</BaseInfoDialog>
