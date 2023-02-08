<script lang="ts">
    import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import ImageInput from "$lib/common/ui/form/ImageInput.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {closeModal} from "$lib/common/utils/modalUtils"
    import {OrderModel} from "../data/model"
    import NumberInput from "$lib/common/ui/form/NumberInput.svelte"

    export let data: OrderModel = {
        size: "",
        details: "",
        photoUrl: "",
        quantity: 1
    }

    let isFormValid

    $: isFormValid = data.size.length > 0 && data.details.length > 0 && data.quantity > 0 && data.photoFile

    function finish() {
        closeModal(data)
    }
</script>

<div>
    <ModalTitle title="Form Tambah Model" showCloseButton on:close={() => closeModal()}/>
    <div class="py-2 space-y-2">
        <div class="grid grid-cols-2 gap-2">
            <TextInput label="Ukuran" bind:value={data.size}/>
            <TextInput label="Nama Model" hint="Masukkan Deskripsi Pesanan" bind:value={data.details}/>
        </div>
        <NumberInput label="Jumlah" bind:value={data.quantity}/>
        <ImageInput bind:value={data.photoFile} label="Foto Contoh Model"/>
        <Button class="btn-filled-secondary w-full" disabled={!isFormValid} on:click={finish}>Simpan</Button>
    </div>
</div>
