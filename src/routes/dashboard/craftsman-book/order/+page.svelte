<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
    import Button from "$lib/common/ui/button/Button.svelte"
    import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import CreateDialog from "./create/CreateDialog.svelte"
    import {craftsmans} from "$lib/stores.js"

    let craftsman = ''
    let salesman = ''
    let startDate = new Date()
    let endDate = new Date()

    function openCreateDialog() {
        const dialog: ModalSettings = {
            type: 'component',
            component: {
                ref: CreateDialog
            }
        }
        modalStore.trigger(dialog)
    }
</script>

<TableContainer>
    <svelte:fragment slot="search">
        <Select label="Tukang" options={$craftsmans} bind:value={craftsman}/>
        <Select label="Sales" options={[]} bind:value={salesman}/>
        <DateRangePicker label="Tanggal" bind:start={startDate} bind:end={endDate}/>
    </svelte:fragment>
    <Button class="btn-filled-primary" slot="buttons" on:click={openCreateDialog}>Buat Pesanan</Button>
</TableContainer>
