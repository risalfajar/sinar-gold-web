<script lang="ts">
	import Select from "$lib/common/ui/form/Select.svelte"
	import {chamfers, itemTypes, storefronts} from "$lib/stores"
	import Checkbox from "$lib/common/ui/form/Checkbox.svelte"
	import Button from "$lib/common/ui/button/Button.svelte"
	import {derived, Readable, writable} from "svelte/store"
	import DiamondGoodsRepository from "../diamond/data/repository"
	import {DiamondGoods} from "../diamond/data/goods"
	import CheckboxGroup from "$lib/common/ui/form/CheckboxGroup.svelte"
	import {closeModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"

	const repository = new DiamondGoodsRepository()
	const source = writable({storefront: '', chamfer: '', itemType: ''})
	const destination = writable({storefront: '', chamfer: '', itemType: ''})
	const isDestinationValid = derived(destination, (destination) => destination.storefront.length > 0 && destination.chamfer.length > 0 && destination.itemType.length > 0)
	const sourceItems: Readable<DiamondGoods[]> = derived(source, (source, set) => {
		if (source.storefront.length === 0 || source.chamfer.length === 0 || source.itemType.length === 0)
			return
		return repository.listenByChamfer(source.storefront, source.chamfer, source.itemType, set)
	}, [])
	const destinationItems: Readable<DiamondGoods[]> = derived(destination, (destination, set) => {
		if (destination.storefront.length === 0 || destination.chamfer.length === 0 || destination.itemType.length === 0)
			return
		return repository.listenByChamfer(destination.storefront, destination.chamfer, destination.itemType, set)
	}, [])
	const selectedItemsIds = writable<string[]>([])
	const movedItemsIds = writable<string[]>([])

	$: if ($source) resetSelection()

	function resetSelection() {
		$selectedItemsIds = []
	}

	function toggleSelectAll(selected: boolean) {
		if (selected)
			$selectedItemsIds = $sourceItems.map(it => it.id)
		else
			resetSelection()
	}

	async function move() {
		triggerModal(loadingModal)
		$movedItemsIds = []
		try {
			for (const id of $selectedItemsIds) {
				await repository.update(id, {
					storefrontCode: $destination.storefront,
					chamferCode: $destination.chamfer,
					itemType: $destination.itemType
				})
				$movedItemsIds = [...$movedItemsIds, id]
				$selectedItemsIds = $selectedItemsIds.filter(it => it !== id)
			}
			successToast(`Berhasil memindah ${$movedItemsIds.length} item`)
		} catch (err) {
			console.error(err)
			errorToast('Terjadi kesalahan')
		}
		closeModal()
	}
</script>

<div class="grid grid-cols-2 gap-8">
    <div class="flex flex-col gap-4">
        <p class="unstyled text-primary-500 font-bold">Talang Sekarang</p>
        <div class="grid grid-cols-3 gap-2">
            <Select label="Etalase" class="!w-auto" options={$storefronts.map(it => it.code)} bind:value={$source.storefront}/>
            <Select label="Talang" class="!w-auto" options={$chamfers.map(it => it.code)} bind:value={$source.chamfer}/>
            <Select label="Tipe Barang" class="!w-auto" options={$itemTypes.map(it => it.name)} bind:value={$source.itemType}/>
        </div>
        <div class="bg-primary-100 p-4 rounded-lg">
            <div class="flex justify-between">
                <Checkbox label="Pilih Semua"
                          labelClass="text-primary-500"
                          disabled={$sourceItems.length === 0}
                          checked={$sourceItems.length > 0 && $sourceItems.length === $selectedItemsIds.length}
                          on:change={(e) => toggleSelectAll(e.target.checked)}/>
                <span class="text-primary-500">{$selectedItemsIds.length} item terpilih</span>
            </div>
            <div class="mt-4 flex flex-col gap-2 h-[40vh] overflow-y-auto">
                {#each $sourceItems as item (item.id)}
                    <div class="px-4 py-2 bg-white rounded-full">
                        <CheckboxGroup label={item.details.name} value={item.id} bind:group={$selectedItemsIds}/>
                    </div>
                {:else}
                    <span class="w-full text-center text-sm text-primary-700 py-2">Tidak ada item</span>
                {/each}
            </div>
        </div>
        <Button class="variant-filled-primary" disabled={$selectedItemsIds.length === 0 || !$isDestinationValid} on:click={move}>Pindahkan Barang
        </Button>
    </div>

    <div class="flex flex-col gap-4">
        <p class="unstyled text-secondary-500 font-bold">Talang Tujuan</p>
        <div class="grid grid-cols-3 gap-2">
            <Select label="Etalase" class="!w-auto" options={$storefronts.map(it => it.code)} bind:value={$destination.storefront}/>
            <Select label="Talang" class="!w-auto" options={$chamfers.map(it => it.code)} bind:value={$destination.chamfer}/>
            <Select label="Tipe Barang" class="!w-auto" options={$itemTypes.map(it => it.name)} bind:value={$destination.itemType}/>
        </div>
        <div class="bg-secondary-100 p-4 rounded-lg">
            <div class="flex justify-end">
                <span class="text-secondary-500">{$movedItemsIds.length} item dipindah</span>
            </div>
            <div class="mt-4 flex flex-col gap-2 h-[40vh] overflow-y-auto">
                {#each $destinationItems as item (item.id)}
                    <div class="px-4 py-2 bg-white rounded-full flex justify-between gap-2">
                        <span>{item.details.name}</span>
                        {#if $movedItemsIds.some(it => it === item.id)}
                            <span class="text-sm text-success-500">New</span>
                        {/if}
                    </div>
                {:else}
                    <span class="w-full text-center text-sm text-secondary-700 py-2">Tidak ada item</span>
                {/each}
            </div>
        </div>
    </div>
</div>
