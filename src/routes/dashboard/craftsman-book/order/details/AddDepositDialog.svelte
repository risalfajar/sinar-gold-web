<script lang="ts">
    import {CraftsmanOrder} from "../data/order"
    import {OrderModel} from "../data/model"
    import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
    import {closeModal} from "$lib/common/utils/modalUtils"
    import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import ImageInput from "$lib/common/ui/form/ImageInput.svelte"
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
    import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {CashAdvance} from "../data/advance"
    import {sumBy} from "lodash-es"
    import {Readable} from "svelte/store"
    import {OrderDeposit} from "../data/deposit"
    import DepositRepository from "../data/source/depositRepository"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"

    export let order: CraftsmanOrder
    export let model: OrderModel
    export let advances: Readable<CashAdvance[]>

    const repository = new DepositRepository(order.id)
    const data: OrderDeposit = {
        id: model.id,
        created: null,
        craftsman: order.craftsman,
        salesman: order.salesman,
        model: model,
        photoUrl: "",
        photoFile: null,
        pricePerGram: 0,
        laborCost: 0,
        totalCost: 0,
        sourceMaterial: order.material,
        finishedMaterial: {
            rate: order.material.rate,
            goldWeight: 0,
            jewelWeight: 0,
            sampleWeight: 0
        },
        goldWeightGap: 0
    }

    let isFormValid: boolean
    let isSaving = false

    $: data.goldWeightGap = +(data.sourceMaterial.goldWeight - data.finishedMaterial.goldWeight).toFixed(2)
    $: data.totalCost = +(data.pricePerGram * data.laborCost).toFixed(0)
    $: isFormValid = data.photoFile != null

    async function save() {
        isSaving = true
        try {
            await repository.save(data)
            successToast('Berhasil menyetor pesanan')
            closeModal()
        } catch (err) {
            console.error(err)
            errorToast('Gagal menyetor pesanan')
        }
        isSaving = false
    }
</script>

<div>
    <ModalTitle title="Form Setor Pesanan"
                showCloseButton
                on:close={() => confirm('Data yang belum disimpan akan hilang, apakah anda yakin?') && closeModal()}/>
    <form class="space-y-4 py-2 max-h-[75vh] overflow-y-auto" on:submit|preventDefault={save}>
        <div class="grid grid-cols-2 gap-4">
            <DatePicker disabled label="Tanggal Setor" value={new Date()}/>
            <TextInput disabled label="Nomor Pesanan" value={order.id}/>
            <TextInput disabled label="Nama Tukang" value={data.craftsman}/>
            <TextInput disabled label="Nama Sales" value={data.salesman.name}/>
            <TextInput disabled label="Nama Model" value={data.model.details}/>
            <TextInput disabled label="Ukuran" value={data.model.size}/>
        </div>
        <ImageInput required label="Foto Pesanan Jadi" bind:value={data.photoFile}/>
        <div class="grid grid-cols-2 gap-4">
            <TextInput disabled label="Kadar" value={data.sourceMaterial.rate}/>
            <WeightInput required label="Berat Permata" bind:value={data.finishedMaterial.jewelWeight}/>
            <WeightInput required label="Berat Contoh" bind:value={data.finishedMaterial.sampleWeight}/>
            <WeightInput required label="Berat Emas Jadi" bind:value={data.finishedMaterial.goldWeight}/>
            <WeightInput disabled label="Berat Bahan Emas" value={data.sourceMaterial.goldWeight}/>
            <WeightInput disabled label="Selisih Bahan Emas" value={data.goldWeightGap}/>
            <PriceInput disabled label="Total Kasbon" value={sumBy($advances, (item) => item.amount)}/>
            <WeightInput required label="Ongkos Kerja" bind:value={data.laborCost}/>
            <PriceInput required label="Harga/gram" bind:value={data.pricePerGram}/>
            <PriceInput disabled label="Total Ongkos Kerja" value={data.totalCost}/>
        </div>
        <Button type="submit" disabled={!isFormValid} isLoading={isSaving} class="w-full variant-filled-primary">Simpan</Button>
    </form>
</div>
