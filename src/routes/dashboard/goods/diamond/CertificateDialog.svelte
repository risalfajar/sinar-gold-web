<script lang="ts">
	import {DiamondGoods} from "./data/goods"
	import {jsPDF} from "jspdf"
	import {onMount} from "svelte"
	import JsBarcode from "jsbarcode"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import Button from "$lib/common/ui/button/Button.svelte"

	export let data: DiamondGoods

	let certificateBody: HTMLElement

	onMount(showBarcode)

	function showBarcode() {
		JsBarcode("#barcode", data.id, {
			width: 1.5,
			height: 20,
			margin: 2,
			fontSize: 12
		})
	}

	function download() {
		const doc = new jsPDF({orientation: "l", unit: "cm", format: [10, 6]})
		doc.html(certificateBody, {
			width: 10,
			windowWidth: 410,
			callback: (doc) => doc.save(`Sertifikat Berlian-${data.id}`),
		})
	}
</script>

<div class="grid grid-cols-5 items-center bg-primary-500 rounded-lg py-2 px-4" bind:this={certificateBody}>
    <div class="col-span-2 relative py-6">
        <div class="w-full rounded-lg aspect-square bg-white flex items-center justify-center p-1">
            <img src={data.photoUrl} alt="foto berlian"/>
        </div>
        <div class="absolute bottom-0 w-full flex justify-center">
            <canvas id="barcode"></canvas>
        </div>
    </div>
    <div class="col-span-3 flex flex-col h-full justify-center items-center">
        <p class="unstyled font-bold mb-2">Toko Mas Sinar</p>
        <div class="w-full bg-gray-50 px-4 py-1 space-y-2">
            <p class="unstyled">Barcode: {data.id}</p>
            <div class="grid grid-cols-2 gap-x-2">
                <span>{data.diamond.amounts[0]}</span>
                <span>Weight: {data.diamond.weight}gr</span>
                <span>{data.diamond.amounts[1]}</span>
                <span>GIA: {data.diamond.giaCode[0]}</span>
                <span>{data.diamond.amounts[2]}</span>
                <span>GIA: {data.diamond.giaCode[1]}</span>
            </div>
            <p class="unstyled w-full text-center">Rp {data.diamond.price.toLocaleString(LOCALE_INDONESIA)}</p>
        </div>
        <div class="w-full flex gap-2 px-4 justify-between">
            <span>{data.created.toLocaleDateString(LOCALE_INDONESIA)}</span>
            <!--       TODO Maryam     -->
        </div>
    </div>
</div>

<div class="w-full flex justify-center">
    <Button class="variant-filled-secondary" on:click={download}>Download</Button>
</div>

<style>
    * {
        @apply text-sm;
    }
</style>
