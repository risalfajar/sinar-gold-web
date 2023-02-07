<script lang="ts">
    export let value: File | null
    export let label: string = ""

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
    <label class="font-bold text-base mb-2">{label}</label>
    <div class="flex justify-center items-center min-h-[12em] w-full border rounded-lg clickable" on:click={() => fileInput.click()}>
        {#if value}
            <img alt="Foto" class="max-h-[18em]" bind:this={img}/>
        {:else}
            <div class="flex flex-col gap-2 justify-center items-center">
                <i class="material-icons-outlined text-gray-500">camera_alt</i>
                <span class="text-gray-500 text-sm select-none">Ambil Gambar</span>
            </div>
        {/if}
    </div>
    <input type="file" class="hidden" accept="image/jpeg, image/png" bind:this={fileInput} on:change={selectImage}/>
</div>
