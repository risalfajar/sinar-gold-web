<script lang="ts">
	import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
	import {closeModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import ImageInput from "$lib/common/ui/form/ImageInput.svelte"
	import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import Select from "$lib/common/ui/form/Select.svelte"
	import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
	import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
	import {DiamondGoods} from "./data/goods"
	import {Step, Stepper} from "@skeletonlabs/skeleton"
	import {chamfers, groupCodes, itemTypes, kinds, markis, stoneTypes, storefronts, suppliers} from "$lib/stores.js"
	import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
	import DiamondGoodsRepository from "./data/repository"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"

	const defaultData: DiamondGoods = {
		id: generateNumberId(),
		created: null,
		category: "",
		chamferCode: "",
		kindCode: "",
		storefrontCode: "",
		supplierCode: "",
		itemType: "",
		photoUrl: "",
		details: {
			attributeName: "",
			attributePrice: 0,
			attributeWeight: 0,
			groupCode: "",
			internCode: "",
			markis: "",
			name: "",
			plasticWeight: 0,
			realWeight: 0,
			stockWeight: 0,
			type: "",
			weight: 0
		},
		diamond: {
			amounts: Array(4).fill(""),
			giaCode: Array(2).fill(""),
			stoneType: "",
			weight: 0,
			price: 0
		}
	}

	export let data: DiamondGoods = defaultData

	const repository = new DiamondGoodsRepository()
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
			data.id = generateNumberId()
		}
		closeModal()
	}
</script>

<ModalTitle title="Tambah Data Barang (Berlian)" showCloseButton
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
            <Select label="Kategori" options={["TODO"]} bind:value={data.category}/>
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
            <Select label="Kode Grup" options={$groupCodes} bind:value={data.details.groupCode}/>
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

    <Step>
        <svelte:fragment slot="header">Data Berlian</svelte:fragment>
        <div class="grid grid-cols-2 gap-4 items-end">
            <TextInput label="Kode Barcode" disabled value={data.id}/>
            <Select label="Jenis Batu" options={$stoneTypes.map(it => it.name)} bind:value={data.diamond.stoneType}/>
            <TextInput label="Jumlah Berlian" bind:value={data.diamond.amounts[0]}/>
            <TextInput hint="Masukkan Jumlah Berlian" bind:value={data.diamond.amounts[1]}/>
            <TextInput hint="Masukkan Jumlah Berlian" bind:value={data.diamond.amounts[2]}/>
            <TextInput hint="Masukkan Jumlah Berlian" bind:value={data.diamond.amounts[3]}/>
            <TextInput label="Kode GIA" bind:value={data.diamond.giaCode[0]}/>
            <TextInput hint="Masukkan Kode GIA" bind:value={data.diamond.giaCode[1]}/>
            <WeightInput label="Berat" bind:value={data.diamond.weight}/>
            <PriceInput label="Harga" bind:value={data.diamond.price}/>
        </div>
    </Step>
</Stepper>
