<script lang="ts">
	import {closeModal} from "$lib/common/utils/modalUtils"
	import FormDialogContent from "$lib/common/ui/dialog/FormDialogContent.svelte"
	import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
	import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
	import CashAdvanceRepository from "../data/source/advanceRepository"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"

	export let orderId: string

    const repository = new CashAdvanceRepository(orderId)

    let amount = 0
    let isSaving = false

    async function save() {
        isSaving = true
        try {
            await repository.save({id: '', created: null, amount})
            successToast('Berhasil membuat kasbon')
            closeModal()
        } catch (err) {
            console.error(err)
            errorToast('Gagal membuat kasbon')
        }
        isSaving = false
    }
</script>

<FormDialogContent isFormValid={amount > 0} {isSaving} on:save={save}>
    <DatePicker disabled value={new Date()} label="Tanggal"/>
    <PriceInput label="Jumlah" bind:value={amount}/>
</FormDialogContent>
