<script lang="ts">
    import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {closeModal} from "$lib/common/utils/modalUtils"
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
    import {CraftsmanOrder, OrderMaterial} from "../data/order"
    import CraftsmanOrderRepository from "../data/source/orderRepository"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"

    const repository = new CraftsmanOrderRepository()

    export let arg: CraftsmanOrder

    let data: Partial<OrderMaterial> = {
        goldWeight: 0,
        sampleWeight: 0,
        jewelWeight: 0
    }
    let isFormValid
    let isSaving = false

    $: isFormValid = data.goldWeight > 0 || data.sampleWeight > 0 || data.jewelWeight > 0
    $: totalGold = +(arg.material.goldWeight + data.goldWeight).toFixed(2)
    $: totalSample = +(arg.material.sampleWeight + data.sampleWeight).toFixed(2)
    $: totalJewel = +(arg.material.jewelWeight + data.jewelWeight).toFixed(2)

    async function save() {
        isSaving = true
        try {
            await repository.update(arg.id, {
                'material.goldWeight': totalGold,
                'material.sampleWeight': totalSample,
                'material.jewelWeight': totalJewel
            })
            successToast('Berhasil menambahkan bahan')
            closeModal()
        } catch (err) {
            console.error(err)
            errorToast('Gagal menambahkan bahan')
        }
        isSaving = false
    }
</script>

<div>
    <ModalTitle title="Form Tambah Bahan" showCloseButton on:close={() => closeModal()}/>
    <form class="py-2 space-y-2">
        <div class="grid grid-cols-2 gap-2">
            <TextInput label="Kadar" value={arg.material.rate} disabled/>
            <WeightInput label="Berat Emas" bind:value={data.goldWeight} helper="Total: {totalGold} gram"/>
            <WeightInput label="Berat Contoh" bind:value={data.sampleWeight} helper="Total: {totalSample} gram"/>
            <WeightInput label="Berat Permata" bind:value={data.jewelWeight} helper="Total: {totalJewel} gram"/>
        </div>
        <Button type="submit" class="variant-filled-secondary w-full" disabled={!isFormValid} isLoading={isSaving} on:click={save}>Simpan</Button>
    </form>
</div>
