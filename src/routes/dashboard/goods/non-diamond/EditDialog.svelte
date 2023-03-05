<script lang="ts">
	import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
	import {closeModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import ImageInput from "$lib/common/ui/form/ImageInput.svelte"
	import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import Select from "$lib/common/ui/form/Select.svelte"
	import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
	import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
	import {NonDiamondGoods} from "./data/goods"
	import {Step, Stepper} from "@skeletonlabs/skeleton"
	import {chamfers, groupCodes, itemTypes, kinds, markis, storefronts, suppliers} from "$lib/stores.js"
	import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
	import NonDiamondGoodsRepository from "./data/repository"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"
	import {GoodsType} from "../data/goodsType"

	const defaultData: NonDiamondGoods = {
		id: generateNumberId(),
		created: null,
		type: GoodsType.NON_DIAMOND,
		groupCode: "",
		chamferCode: "",
		kindCode: "",
		storefrontCode: "",
		supplierCode: "",
		itemType: "",
		photoUrl: "",
		details: {
			name: "",
			internCode: "",
			markis: "",
			attributeName: "",
			attributePrice: 0,
			attributeWeight: 0,
			plasticWeight: 0,
			realWeight: 0,
			stockWeight: 0,
			weight: 0
		}
	}

	export let data: NonDiamondGoods = defaultData

	const repository = new NonDiamondGoodsRepository()
	const isEditMode = $$props.data != null

	let photo: File | undefined

	async function save() {
		triggerModal(loadingModal)
		try {
			await repository.saveWithImage(data, photo)
			successToast('Berhasil menyimpan data')
			closeModal()
		} catch (err) {
			console.error(err)
			errorToast('Gagal menyimpan data')
			if (!isEditMode)
				data.id = generateNumberId() // there could be a possibility of id clash
		}
		closeModal()
	}
</script>

<ModalTitle title="{isEditMode ? 'Edit' : 'Tambah'} Data Barang (Non Berlian)" showCloseButton
            on:close={() => confirm('Data yang belum disimpan akan hilang, apakah anda yakin?') && closeModal()}/>
<Stepper
        buttonNextLabel="Selanjutnya"
        buttonBackLabel="Kembali"
        buttonCompleteLabel="Simpan"
        buttonNext="btn variant-filled-secondary"
        stepTerm=""
        regionContent="max-h-[75vh] overflow-y-auto"
        on:complete={save}>
    <Step>
        <svelte:fragment slot="header">Data Barang</svelte:fragment>
        <div class="grid grid-cols-2 gap-4">
            <DatePicker label="Tanggal" disabled value={new Date()}/>
            <TextInput label="Kode Barcode" disabled value={data.id}/>
            <Select label="Kode Group" options={$groupCodes} bind:value={data.groupCode}/>
            <Select label="Kode Jenis" options={$kinds.map(it => it.code)} bind:value={data.kindCode}/>
            <Select label="Kode Talang" options={$chamfers.map(it => it.code)} bind:value={data.chamferCode}/>
            <Select label="Kode Etalase" options={$storefronts.map(it => it.code)} bind:value={data.storefrontCode}/>
            <Select label="Tipe Barang" options={$itemTypes.map(it => it.name)} bind:value={data.itemType}/>
            <Select label="Kode Supplier" options={$suppliers.map(it => it.code)} bind:value={data.supplierCode}/>
        </div>
    </Step>

    <Step>
        <svelte:fragment slot="header">Detail Barang</svelte:fragment>
        <ImageInput bind:value={photo} placeholderUrl={data.photoUrl}/>
        <div class="grid grid-cols-2 gap-4">
            <TextInput label="Nama Barang" bind:value={data.details.name}/>
            <TextInput label="Kode Intern" bind:value={data.details.internCode}/>
            <Select label="Markis" options={$markis.map(it => it.code)} bind:value={data.details.markis}/>
            <WeightInput label="Berat Asli" bind:value={data.details.realWeight}/>
            <WeightInput label="Berat" bind:value={data.details.weight}/>
            <WeightInput label="Berat Stock" bind:value={data.details.stockWeight}/>
            <TextInput label="Nama Atribut" bind:value={data.details.attributeName}/>
            <WeightInput label="Berat Atribut" bind:value={data.details.attributeWeight}/>
            <PriceInput label="Harga Atribut" bind:value={data.details.attributePrice}/>
            <WeightInput label="Berat Plastik" bind:value={data.details.plasticWeight}/>
        </div>
    </Step>
</Stepper>
