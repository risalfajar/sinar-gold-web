<script lang="ts">
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {modalStore} from "@skeletonlabs/skeleton"

    type T = $$Generic

    export let data: T
    export let repository: MapDatabaseRepository<T>
    export let isFormValid: boolean

    let isSaving = false

    async function save() {
        isSaving = true
        try {
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

<FormDialog {isFormValid} {isSaving} on:save={save}>
    <slot/>
</FormDialog>
