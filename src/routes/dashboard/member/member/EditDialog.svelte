<script lang="ts">
	import {Member} from "./data/member"
	import {closeModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
	import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
	import TextBoxInput from "$lib/common/ui/form/TextBoxInput.svelte"
	import MemberRepository from "./data/repository"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"

	export let data: Member = {
		id: generateNumberId(),
		created: null,
		name: "",
		idNumber: "",
		birthDate: new Date(2000, 0),
		address: "",
		city: "",
		email: "",
		phoneNumber: "",
		point: 0,
		subDistrict: "",
		urbanVillage: "",
		keywords: []
	}

	const repository = new MemberRepository()
	const isEditMode = $$props.data != null

	async function save() {
		triggerModal(loadingModal)
		try {
			await repository.save(data)
			successToast('Berhasil menambahkan member')
			closeModal()
		} catch (err) {
			console.error(err)
			errorToast('Gagal menambahkan member')
			if (!isEditMode)
				data.id = generateNumberId()
		}
		closeModal()
	}
</script>

<FormDialog title="{isEditMode ? 'Edit' : 'Tambah'} Member" class="w-96" on:save={save}>
    <TextInput label="Kode Member" value={data.id} disabled/>
    <TextInput label="Nama Customer" bind:value={data.name} required/>
    <TextInput label="NIK" bind:value={data.idNumber} required/>
    <DatePicker label="Tanggal Lahir" bind:value={data.birthDate}/>
    <TextInput label="No HP" bind:value={data.phoneNumber} required/>
    <TextInput label="Email" bind:value={data.email}/>
    <TextBoxInput label="Alamat" bind:value={data.address} required/>
    <TextInput label="Kecamatan" bind:value={data.subDistrict}/>
    <TextInput label="Kelurahan" bind:value={data.urbanVillage}/>
    <TextInput label="Kota" bind:value={data.city}/>
</FormDialog>
