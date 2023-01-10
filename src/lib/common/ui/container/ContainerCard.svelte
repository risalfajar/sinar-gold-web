<script lang="ts">
    export let title: string
</script>

<div class="flex flex-col flex-grow w-full bg-white shadow-sm p-8 rounded-2xl space-y-4 {$$props.class}">
    <p class="unstyled text-secondary-500 font-bold mb-4">{title}</p>
    <slot/>
</div>
