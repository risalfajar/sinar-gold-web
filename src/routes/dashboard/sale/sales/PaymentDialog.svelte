<script lang="ts">
	import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
	import {closeAllModals, closeModal, errorModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import {Sales} from "./data/sales"
	import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
	import Select from "$lib/common/ui/form/Select.svelte"
	import {clamp, sumBy} from "lodash-es"
	import IconButton from "$lib/common/ui/button/IconButton.svelte"
	import {Payment, PaymentMethod} from "./data/payment"
	import {writable} from "svelte/store"
	import {createRender, createTable} from "svelte-headless-table"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import TableActions from "$lib/common/ui/table/TableActions.svelte"
	import {removeIndex} from "$lib/common/utils/arrayUtils.js"
	import {slide} from "svelte/transition"
	import Button from "$lib/common/ui/button/Button.svelte"
	import {bankAccounts} from "$lib/stores"
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import NumberInput from "$lib/common/ui/form/NumberInput.svelte"
	import SalesRepository from "./data/repository"
	import {successToast} from "$lib/common/utils/toastUtils"

	const payments = writable<Payment[]>([])
	const paymentsTable = createTable(payments)
	const paymentsColumns = paymentsTable.createColumns([
		paymentsTable.column({
			header: 'Jenis',
			accessor: 'method'
		}),
		paymentsTable.column({
			id: 'description',
			header: 'Keterangan',
			accessor: (item) => getDescription(item)
		}),
		paymentsTable.column({
			id: 'amount',
			header: 'Total',
			accessor: (item) => item.amount.toLocaleString(LOCALE_INDONESIA),
		}),
		paymentsTable.display({
			id: 'actions',
			header: 'Actions',
			cell: (cell, state) => createRender(TableActions, {showEditButton: false})
				.on('delete', () => $payments = removeIndex($payments, cell.row.id))
		})
	])

	export let data: Sales

	let payment: Payment = {
		method: PaymentMethod.CASH,
		amount: 0,
		details: {storeAccount: '', customerAccount: '', cardNumber: '', fee: 0}
	}
	let paymentTotal: number
	let remainingBill: number

	$: paymentTotal = sumBy($payments, (it) => it.amount)
	$: remainingBill = data.priceDetails.remaining - paymentTotal

	function add() {
		$payments = $payments.concat({...payment, amount: clamp(payment.amount, 0, remainingBill)})
		payment.amount = 0
		payment.details = {storeAccount: '', customerAccount: '', cardNumber: '', fee: 0}
	}

	function getDescription(payment: Payment) {
		switch (payment.method) {
			case PaymentMethod.CASH:
				return 'CASH'
			case PaymentMethod.TRANSFER:
				return `${payment.details.storeAccount} - ${payment.details.customerAccount}`
			case PaymentMethod.DEBIT:
				return `${payment.details.storeAccount}`
			case PaymentMethod.KREDIT:
				return `${payment.details.storeAccount} - ${payment.details.cardNumber}`
		}
	}

	async function save() {
		try {
			triggerModal(loadingModal)
			const repository = new SalesRepository()
			await repository.create(data)
			successToast('Berhasil membuat penjualan')
			closeAllModals()
		} catch (err) {
			console.error(err)
			closeModal()
			triggerModal({...errorModal, body: err.message})
		}
	}
</script>

<FormDialog title="Form Pembayaran" showCloseButton on:close={closeModal}>
    <div class="grid grid-cols-3 gap-2">
        <PriceInput disabled label="Total Harga Jual" value={data.priceDetails.sale}/>
        <PriceInput disabled label="Total Panjar" value={data.priceDetails.paid}/>
        <PriceInput disabled label="Harus Bayar" value={data.priceDetails.remaining}/>
    </div>

    {#if remainingBill > 0}
        <form name="payment" class="grid grid-cols-2 gap-2" transition:slide|local on:submit|preventDefault={add}>
            <Select form="payment" label="Metode Pembayaran" required options={Object.values(PaymentMethod)} bind:value={payment.method}/>
            {#if payment.method !== PaymentMethod.CASH}
                <Select label="No Rekening" required options={$bankAccounts.map(it => it.number)} bind:value={payment.details.storeAccount}/>
            {/if}
            {#if payment.method === PaymentMethod.TRANSFER}
                <TextInput label="No Rekening Pelanggan" required bind:value={payment.details.customerAccount}/>
            {/if}
            {#if payment.method === PaymentMethod.KREDIT}
                <TextInput label="Nomor Kartu" required bind:value={payment.details.cardNumber}/>
            {/if}
            <PriceInput form="payment" label="Nominal" required bind:value={payment.amount}/>
            {#if payment.method === PaymentMethod.DEBIT || payment.method === PaymentMethod.KREDIT}
                <NumberInput label="Fee" required bind:value={payment.details.fee}/>
            {/if}
            <PriceInput label="Sisa" disabled value={remainingBill}/>
            <IconButton class="rounded-md variant-filled-secondary col-start-2 self-end justify-self-end" disabled={payment.amount <= 0}>
                <i class="material-icons">add</i>
            </IconButton>
        </form>
    {/if}

    <DataTable model={paymentsTable.createViewModel(paymentsColumns)}>
        <tr class="font-bold border-t border-t-gray-200">
            <td colspan="2">Grand Total</td>
            <td>{paymentTotal.toLocaleString(LOCALE_INDONESIA)}</td>
        </tr>
    </DataTable>

    <svelte:fragment slot="buttons">
        <Button class="variant-filled-secondary" disabled={remainingBill > 0} on:click={save}>Bayar</Button>
    </svelte:fragment>
</FormDialog>
