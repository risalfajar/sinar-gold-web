<script lang="ts">
	import BaseInfoDialog from "$lib/common/ui/dialog/BaseInfoDialog.svelte"
	import DataText from "$lib/common/ui/text/DataText.svelte"
	import {DiamondGoods} from "./data/goods"
	import {LOCALE_INDONESIA} from "$lib/constants.js"
	import Button from "$lib/common/ui/button/Button.svelte"
	import {triggerModal} from "$lib/common/utils/modalUtils"
	import CertificateDialog from "./CertificateDialog.svelte"

	export let data: DiamondGoods

	function downloadCertificate() {
		triggerModal({
			type: 'component',
			component: {
				ref: CertificateDialog,
				props: {data},
			},
			modalClasses: '!w-fit'
		})
	}
</script>

<BaseInfoDialog class="w-[32em]" title="Detail Barang">
    <DataText title="Nama Barang" content={data.details.name}/>
    <img src={data.photoUrl} class="w-full"/>
    <div class="grid grid-cols-2 gap-4">
        <DataText title="Tanggal" content={data.created.toLocaleDateString(LOCALE_INDONESIA, {dateStyle: "long"})}/>
        <DataText title="Kode Barcode" content={data.id}/>
        <DataText title="Kategori" content={data.category}/>
        <DataText title="Kode Jenis" content={data.kindCode}/>
        <DataText title="Kode Talang" content={data.chamferCode}/>
        <DataText title="Kode Etalase" content={data.storefrontCode}/>
        <DataText title="Tipe Barang" content={data.itemType}/>
        <DataText title="Kode Supplier" content={data.supplierCode}/>
        <DataText title="Kode Intern" content={data.details.internCode}/>
        <DataText title="Markis" content={data.details.markis}/>
        <DataText title="Berat Asli" content={data.details.realWeight}/>
        <DataText title="Berat" content={data.details.weight}/>
        <DataText title="Nama Atribut" content={data.details.attributeName}/>
        <DataText title="Berat Atribut" content={data.details.attributeWeight}/>
        <DataText title="Harga Atribut" content={data.details.attributePrice.toLocaleString(LOCALE_INDONESIA)}/>
        <DataText title="Berat Plastik" content={data.details.plasticWeight}/>
    </div>
    <Button class="variant-filled-primary" on:click={downloadCertificate}>Download Sertifikat Berlian</Button>
</BaseInfoDialog>
