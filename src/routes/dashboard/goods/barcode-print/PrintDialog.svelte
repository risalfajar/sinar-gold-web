<script lang="ts">
	import {DiamondGoods} from "../diamond/data/goods"
	import {NonDiamondGoods} from "../non-diamond/data/goods"
	import Button from "$lib/common/ui/button/Button.svelte"
	import {jsPDF} from "jspdf"

	export let data: DiamondGoods | NonDiamondGoods

	let content: HTMLElement

	function print() {
		const doc = new jsPDF({orientation: "l", unit: "cm", format: [4, 3.1]})
		doc.html(content, {
			width: 4,
			windowWidth: 200,
			autoPaging: 'text',
			callback: (doc) => {
				doc.autoPrint()
				window.open(doc.output('bloburl'))
			},
		})
	}
</script>

<div class="w-[12em] flex flex-col justify-center gap-2">
    <div class="border border-primary-500 border-b-[1em] rounded-lg overflow-hidden" bind:this={content}>
        <div class="p-4">
            <div class="w-full text-primary-500 mb-4 flex gap-2">
                <span>TOKO</span>
                <span>SINAR</span>
                <span>MAS</span>
            </div>
            <p class="unstyled text-sm">{data.details.name} - {data.details.weight}gr</p>
            <p class="unstyled text-sm text-gray-600">{data.id}</p>
        </div>
    </div>
    <Button class="variant-filled-secondary" on:click={print}>Cetak</Button>
</div>
