<script lang="ts">
	import FormDialogContent from "$lib/common/ui/dialog/FormDialogContent.svelte"
	import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"
	import {modalStore} from "@skeletonlabs/skeleton"

	type T = $$Generic

	export let data: T
	export let repository: MapDatabaseRepository<T>
	export let isFormValid: boolean
	export let oldData: T | null // overload is only needed when id can be changed in the form (ex: Craftsman)

	let isSaving = false

	async function save() {
		isSaving = true
		try {
			if (oldData)
				await repository.update(oldData, data)
			else
				await repository.save(data)
			successToast('Berhasil menyimpan data')
			modalStore.close()
		} catch (err) {
			console.error(err)
			errorToast('Gagal menyimpan data')
		}
		isSaving = false
	}
</script>

<FormDialogContent {isFormValid} {isSaving} on:save={save}>
    <slot/>
</FormDialogContent>
