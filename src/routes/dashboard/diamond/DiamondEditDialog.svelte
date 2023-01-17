<script lang="ts">
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {ItemAlreadyExistError} from "$lib/errors"
    import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"

    type T = $$Generic

    export let data: T
    export let repository: MapDatabaseRepository<T>
    export let isEditMode: boolean
    export let isFormValid: boolean

    let isSaving = false

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

<FormDialog {isFormValid} {isSaving} on:save={save}>
    <slot/>
</FormDialog>
