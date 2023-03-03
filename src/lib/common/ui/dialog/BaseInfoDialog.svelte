<script lang="ts">
	export let title = "TOKO SINAR MAS"
</script>

<div class="-m-4 {$$props.class}">
    <p class="unstyled w-full bg-primary-500 rounded-t-lg text-white font-semibold text-center py-2">{title}</p>
    <div class="overflow-y-auto max-h-[75vh] p-4 flex flex-col gap-4">
        <slot/>
    </div>
</div>
