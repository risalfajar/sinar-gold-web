<script>
    import {page} from '$app/stores'
    import {goto} from "$app/navigation"
</script>

<div class="w-screen h-screen flex flex-col justify-center items-center">
    <h2>Maaf, Terjadi Kesalahan</h2>
    <p>Pesan kesalahan:</p>
    <pre class="my-4">{$page.status} {$page.error.message}</pre>
    <button class="mt-8 btn variant-filled-primary" on:click={() => goto('/')}>Kembali</button>
</div>
