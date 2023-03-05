<script lang="ts">
	import FormDialogContent from "$lib/common/ui/dialog/FormDialogContentContent.svelte"
	import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"
	import {modalStore} from "@skeletonlabs/skeleton"
	import {ItemAlreadyExistError} from "$lib/errors"
	import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import {ObjectSchema} from "$lib/common/types/objectSchema"
	import {Diamond} from "$lib/diamond/diamond"

	const defaultData: Diamond = {
        code: generateNumberId(),
        name: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<Diamond>
    export let schema: ObjectSchema<Diamond>

    let dataArgs: Diamond | null = null
    let data = dataArgs ? {...dataArgs} as Diamond : defaultData
    let isSaving = false

    $: labels = Object.keys(schema ?? {})
    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0 && data.name.length > 0

    async function save() {
        isSaving = true
        try {
            if (isEditMode)
                await repository.save(data)
            else
                await repository.create(data)
            successToast('Berhasil menyimpan data')
            modalStore.close()
        } catch (err) {
            // very rare case, but possible
            if (err instanceof ItemAlreadyExistError) {
                data[repository.primaryKey] = generateNumberId()
                return save()
            } else {
                console.error(err)
                errorToast('Gagal menyimpan data')
            }
        }
        isSaving = false
    }
</script>

<FormDialogContent {isFormValid} {isSaving} on:save={save}>
    <TextInput disabled label={labels[0]} bind:value={data.code}/>
    <TextInput label={labels[1]} bind:value={data.name}/>
</FormDialogContent>
