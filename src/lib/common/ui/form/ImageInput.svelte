<script lang="ts">
    import Label from "$lib/common/ui/form/Label.svelte"

    export let value: File | null
    export let placeholderUrl: string = ""
    export let label: string = ""
    export let required: boolean = false

    let fileInput: HTMLInputElement
    let img: HTMLImageElement

    $: if (value) displayPhoto(value)

    function selectImage() {
        if (fileInput.files.length > 0)
            value = fileInput.files.item(0)
    }

    function displayPhoto(value: File) {
        const reader = new FileReader()
        reader.addEventListener("load", function () {
            img.setAttribute("src", reader.result?.toString())
        })
        reader.readAsDataURL(value)
    }
</script>

<div>
    <Label>{label}</Label>
    <div class="flex justify-center items-center min-h-[12em] w-full border rounded-lg clickable" on:click={() => fileInput.click()}>
        {#if value}
            <img alt="Foto" class="max-h-[18em]" bind:this={img}/>
        {:else if placeholderUrl.length > 0}
            <img alt="Foto" class="max-h-[18em]" src={placeholderUrl}/>
        {:else}
            <div class="flex flex-col gap-2 justify-center items-center">
                <i class="material-icons-outlined text-gray-500">camera_alt</i>
                <span class="text-gray-500 text-sm select-none">Ambil Gambar</span>
            </div>
        {/if}
    </div>
    <input {required} type="file" class="hidden" accept="image/jpeg, image/png" bind:this={fileInput} on:change={selectImage}/>
</div>
