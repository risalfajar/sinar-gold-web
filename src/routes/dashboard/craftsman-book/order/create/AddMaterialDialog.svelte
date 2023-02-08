<script lang="ts">
    import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {closeModal} from "$lib/common/utils/modalUtils"
    import {OrderMaterial} from "../data/material"
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"

    export let data: OrderMaterial = {
        rate: "",
        goldWeight: 0,
        sampleWeight: 0,
        jewelWeight: 0
    }

    let isFormValid

    $: isFormValid = data.rate.length > 0

    function finish() {
        closeModal(data)
    }
</script>

<div>
    <ModalTitle title="Form Tambah Bahan" showCloseButton on:close={() => closeModal()}/>
    <div class="py-2 space-y-2">
        <div class="grid grid-cols-2 gap-2">
            <TextInput label="Kadar" bind:value={data.rate}/>
            <WeightInput label="Berat Emas" bind:value={data.goldWeight}/>
            <WeightInput label="Berat Contoh" bind:value={data.sampleWeight}/>
            <WeightInput label="Berat Permata" bind:value={data.jewelWeight}/>
        </div>
        <Button class="btn-filled-secondary w-full" disabled={!isFormValid} on:click={finish}>Simpan</Button>
    </div>
</div>
