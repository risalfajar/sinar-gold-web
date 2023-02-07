<script lang="ts">
    import IconButton from "$lib/common/ui/button/IconButton.svelte"

    export let photo: File

    function readPhoto() {
        const reader = new FileReader()
        reader.addEventListener("load", function () {
            openImage(reader.result)
        })
        reader.readAsDataURL(photo)
    }

    function openImage(data) {
        const image = new Image()
        const w = window.open("")
        image.src = data
        w.document.write(image.outerHTML)
    }
</script>

<IconButton on:click={readPhoto}>
    <i class="material-icons text-primary-500">photo</i>
</IconButton>
