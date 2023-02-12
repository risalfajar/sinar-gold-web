<script lang="ts">
    import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import ImageInput from "$lib/common/ui/form/ImageInput.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {closeModal} from "$lib/common/utils/modalUtils"
    import {OrderModel} from "../data/model"
    import NumberInput from "$lib/common/ui/form/NumberInput.svelte"

    export let data: OrderModel = {
        id: "",
        size: "",
        details: "",
        photoUrl: "",
        photoFile: undefined,
        quantity: 1,
        isFinished: false
    }

    let isFormValid

    $: isFormValid = data.size.length > 0 && data.details.length > 0 && data.quantity > 0 && (data.photoFile || data.photoUrl.length > 0)

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
        <ImageInput bind:value={data.photoFile} placeholderUrl={data.photoUrl} label="Foto Contoh Model"/>
        <Button class="variant-filled-secondary w-full" disabled={!isFormValid} on:click={finish}>Simpan</Button>
    </div>
</div>
