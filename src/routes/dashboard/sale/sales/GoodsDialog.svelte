<script lang="ts">
	import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
	import {closeModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import GoodsRepository from "../../goods/data/repository"
	import Button from "$lib/common/ui/button/Button.svelte"
	import Select from "$lib/common/ui/form/Select.svelte"
	import {SoldGoods} from "./data/sales"
	import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
	import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
	import {errorToast} from "$lib/common/utils/toastUtils"

	const goodsRepository = new GoodsRepository()

	export let data: SoldGoods = {
		id: "",
		marketplace: "",
		name: "",
		groupCode: "",
		weight: 0,
		note: "",
		attribute: {name: "", price: 0, weight: 0},
		price: {goodsPrice: 0, salePrice: 0, cost: 0, total: 0}
	}

	let searchCode = data.id

	$: data.price.total = data.price.salePrice + data.price.cost
	$: isFormValid = data.id.length > 0

	async function searchGoods() {
		if (searchCode.length === 0)
			return

		triggerModal(loadingModal)
		try {
			const goods = await goodsRepository.get(searchCode)
			if (goods) {
				data.id = goods.id
				data.name = goods.details.name
				data.weight = goods.details.weight
				data.groupCode = goods.groupCode
				data.attribute.name = goods.details.attribute.name
				data.attribute.price = goods.details.attribute.price
				data.attribute.weight = goods.details.attribute.weight
				data.price.goodsPrice = goods.details.price
				data.price.salePrice = goods.details.price
			} else
				errorToast('Barang tidak ditemukan')
		} catch (err) {
			console.error(err)
			errorToast('Terjadi kesalahan')
		}
		closeModal()
	}
</script>

<FormDialog title="Form Beli Baru" showCloseButton {isFormValid} on:close={() => closeModal()} on:submit={() => closeModal(data)}>
    <div class="grid grid-cols-2 gap-4">
        <div class="flex items-end gap-1">
            <TextInput label="Kode Barcode" bind:value={searchCode} on:keydown={(e) => e.code === 'Enter' && searchGoods() && e.preventDefault()}/>
            <Button type="button" class="h-fit variant-filled-primary" disabled={searchCode.length === 0} on:click={searchGoods}>Cari</Button>
        </div>
        <Select required label="Marketplace" options={['SHOPEE', 'TOKOPEDIA', 'LAZADA']} bind:value={data.marketplace}/>
        <TextInput label="Nama Barang" disabled value={data.name}/>
        <TextInput label="Nama Atribut" disabled value={data.attribute.name}/>
        <PriceInput label="Harga Atribut" disabled value={data.attribute.price}/>
        <WeightInput label="Berat Atribut" disabled value={data.attribute.weight}/>
        <WeightInput label="Berat Barang" disabled value={data.weight}/>
        <PriceInput label="Harga Barang" disabled value={data.price.goodsPrice}/>
        <PriceInput label="Harga Jual" bind:value={data.price.salePrice}/>
        <PriceInput label="Ongkos" bind:value={data.price.cost}/>
        <PriceInput label="Total Harga" disabled value={data.price.total}/>
        <TextInput label="Keterangan" bind:value={data.note}/>
    </div>
</FormDialog>
