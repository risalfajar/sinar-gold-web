<script lang="ts">
	import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
	import {closeModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import Button from "$lib/common/ui/button/Button.svelte"
	import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import {CustomerType, Sales, SalesStatus, SoldGoods} from "./data/sales"
	import RadioButton from "$lib/common/ui/form/RadioButton.svelte"
	import RadioButtonGroup from "$lib/common/ui/form/RadioButtonGroup.svelte"
	import MemberRepository from "../../member/member/data/repository"
	import AutoCompleteInput from "$lib/common/ui/form/AutoCompleteInput.svelte"
	import {Member} from "../../member/member/data/member"
	import Select from "$lib/common/ui/form/Select.svelte"
	import {salesmans} from "$lib/stores"
	import NonMemberRepository from "../../member/non-member/data/repository"
	import {errorToast} from "$lib/common/utils/toastUtils"
	import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
	import GoodsDialog from "./GoodsDialog.svelte"
	import {writable} from "svelte/store"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import {createRender, createTable} from "svelte-headless-table"
	import {sumBy} from "lodash-es"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import PaymentDialog from "./PaymentDialog.svelte"
	import TableActions from "$lib/common/ui/table/TableActions.svelte"
	import {getRowData} from "$lib/common/utils/tableUtils"

	const memberRepository = new MemberRepository()
	const goods = writable<SoldGoods[]>([])
	const goodsTable = createTable(goods)
	const goodsColumns = goodsTable.createColumns([
		goodsTable.column({
			header: 'Kode Group',
			accessor: 'groupCode'
		}),
		goodsTable.column({
			header: 'Kode Barcode',
			accessor: 'id'
		}),
		goodsTable.column({
			header: 'Nama Barang',
			accessor: 'name'
		}),
		goodsTable.column({
			id: 'weight',
			header: 'Berat',
			accessor: (item) => item.weight + ' gram'
		}),
		goodsTable.column({
			id: 'goodsPrice',
			header: 'Harga Barang',
			accessor: (item) => item.price.goodsPrice.toLocaleString(LOCALE_INDONESIA)
		}),
		goodsTable.column({
			id: 'salePrice',
			header: 'Harga Jual',
			accessor: (item) => item.price.salePrice.toLocaleString(LOCALE_INDONESIA)
		}),
		goodsTable.column({
			id: 'cost',
			header: 'Ongkos',
			accessor: (item) => item.price.cost.toLocaleString(LOCALE_INDONESIA)
		}),
		goodsTable.column({
			id: 'total',
			header: 'Total Harga',
			accessor: (item) => item.price.total.toLocaleString(LOCALE_INDONESIA)
		}),
		goodsTable.display({
			id: 'actions',
			header: 'Actions',
			cell: (cell, state) => createRender(TableActions, {showEditButton: false})
				.on('edit', () => openGoodsDialog(getRowData(state, cell)))
				.on('delete', () => {
					delete data.goods[getRowData(state, cell).id]
					data.goods = data.goods
				})
		})
	])

	export let data: Sales = {
		id: "",
		createdAt: null,
		createdBy: '', // will be reassigned by back-end
		status: SalesStatus.WAITING,
		customer: {id: "", address: "", name: "", phoneNumber: "", salesmanCode: "", type: CustomerType.MEMBER},
		goods: {},
		priceDetails: {
			sale: 0,
			paid: 0,
			remaining: 0
		},
		payments: []
	}

	let isMemberSaved = false

	$: goods.set(Object.values(data.goods))
	$: data.priceDetails.sale = sumBy(Object.values(data.goods), (it) => it.price.total)
	$: data.priceDetails.remaining = data.priceDetails.sale - data.priceDetails.paid
	$: isCustomerValid = data.customer.name.length > 0 && data.customer.address.length > 0 && data.customer.phoneNumber.length > 0 && data.customer.salesmanCode.length > 0
	$: isSaleEmpty = $goods.length === 0 // TODO update, add panjar & pesanan
	$: canPay = isMemberSaved && !isSaleEmpty

	async function searchMember(keyword: string) {
		if (keyword.length === 0)
			return []
		return memberRepository.getByKeyword(keyword)
	}

	function setMember(member: Member) {
		data.customer.id = member.id
		data.customer.name = member.name
		data.customer.address = member.address
		data.customer.phoneNumber = member.phoneNumber
	}

	function clearMember() {
		data.customer.id = ''
		data.customer.name = ''
		data.customer.address = ''
		data.customer.phoneNumber = ''
	}

	async function saveCustomer() {
		if (data.customer.type === CustomerType.NON_MEMBER) {
			triggerModal(loadingModal)
			try {
				const repository = new NonMemberRepository()
				data.customer.id = await repository.save({
					id: generateNumberId(),
					created: null,
					name: data.customer.name,
					phoneNumber: data.customer.phoneNumber,
					address: data.customer.phoneNumber
				})
				isMemberSaved = true
			} catch (err) {
				console.error(err)
				errorToast('Gagal menyimpan data customer')
			}
			closeModal()
		} else
			isMemberSaved = true
	}

	function openGoodsDialog(goods?: SoldGoods) {
		triggerModal({
			type: 'component',
			component: {
				ref: GoodsDialog,
				props: goods && {data: goods}
			},
			meta: {mandatory: true},
			response: (r: SoldGoods) => {
				if (r) data.goods[r.id] = r
			}
		})
	}

	function openPaymentDialog() {
		triggerModal({
			type: 'component',
			component: {
				ref: PaymentDialog,
				props: {data}
			}
		})
	}
</script>

<FormDialog title="Buat Penjualan" showCloseButton on:close={() => confirm('Data yang belum disimpan akan hilang, yakin?') && closeModal()}>
    <div class="grid grid-cols-2 gap-2">
        <DatePicker label="Tanggal" value={new Date()} disabled/>
        <RadioButtonGroup name="customerType" label="Jenis Customer">
            <RadioButton label="Member" value={CustomerType.MEMBER} disabled={isMemberSaved} bind:group={data.customer.type}/>
            <RadioButton label="Non Member" value={CustomerType.NON_MEMBER} disabled={isMemberSaved} on:click={clearMember}
                         bind:group={data.customer.type}/>
        </RadioButtonGroup>
        {#if data.customer.type === CustomerType.MEMBER}
            <AutoCompleteInput label="Nama Member" loadOptions={searchMember} itemLabel="name" itemId="id" required disabled={isMemberSaved}
                               on:change={(e) => setMember(e.detail)}
                               on:clear={clearMember}/>
            <TextInput label="No HP" value={data.customer.phoneNumber} disabled/>
            <TextInput label="Alamat" value={data.customer.address} disabled/>
        {:else}
            <TextInput label="Nama Customer" required disabled={isMemberSaved} bind:value={data.customer.name}/>
            <TextInput label="No HP" required disabled={isMemberSaved} bind:value={data.customer.phoneNumber}/>
            <TextInput label="Alamat" required disabled={isMemberSaved} bind:value={data.customer.address}/>
        {/if}
        <Select label="Kode Sales" required disabled={isMemberSaved} options={$salesmans.map(it => it.code)} bind:value={data.customer.salesmanCode}/>
    </div>

    {#if !isMemberSaved}
        <Button class="variant-filled-secondary" type="button" disabled={!isCustomerValid} on:click={saveCustomer}>Simpan Customer</Button>
    {/if}

    <div class="grid grid-cols-3 gap-2">
        <Button class="variant-filled-primary" type="button" on:click={() => openGoodsDialog()}>
            <i class="material-icons">add</i>
            Beli Baru
        </Button>
    </div>

    {#if $goods.length > 0}
        <div>
            <h5 class="font-bold">Beli Baru</h5>
            <DataTable model={goodsTable.createViewModel(goodsColumns)}/>
        </div>
    {/if}

    {#if !isSaleEmpty}
        <hr class="divider border-primary-500"/>
        <div class="flex gap-8 font-bold">
            <span class="flex-grow text-end">Total Bayar</span>
            <span>Rp {data.priceDetails.remaining.toLocaleString(LOCALE_INDONESIA)}</span>
        </div>
    {/if}

    <svelte:fragment slot="buttons">
        <Button class="variant-filled-secondary" type="button" disabled={!canPay} on:click={openPaymentDialog}>Bayar Sekarang</Button>
        <Button class="variant-filled-secondary" disabled={!canPay}>Bayar Dengan Tukar</Button>
    </svelte:fragment>
</FormDialog>
