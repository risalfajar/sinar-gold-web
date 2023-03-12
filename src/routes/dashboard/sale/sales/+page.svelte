<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import Button from "$lib/common/ui/button/Button.svelte"
	import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
	import {writable} from "svelte/store"
	import {triggerModal} from "$lib/common/utils/modalUtils"
	import EditDialog from "./EditDialog.svelte"

	const startDate = writable(new Date())
	const endDate = writable(new Date())

	function openCreateDialog() {
		triggerModal({
			type: 'component',
			component: {
				ref: EditDialog
			},
			meta: {mandatory: true}
		})
	}
</script>

<TableContainer>
    <svelte:fragment slot="search">
        <DateRangePicker label="Tanggal" bind:start={$startDate} bind:end={$endDate}/>
        <SearchInput/>
    </svelte:fragment>
    <Button slot="buttons" class="variant-filled-primary" on:click={openCreateDialog}>Buat Penjualan</Button>

    <!--    <DataTable model={} clickable/>-->
</TableContainer>
