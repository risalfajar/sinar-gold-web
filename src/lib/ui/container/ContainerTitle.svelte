<script lang="ts">
    import Icon from "src/lib/ui/icon/Icon.svelte"

    export let title: string
    export let icon: string = title
</script>

<div class="flex flex-row items-center gap-4 px-4">
    <Icon class="fill-primary-500 w-12 h-12" name={icon}/>
    <span class="text-xl font-extrabold text-secondary-500">{title}</span>
</div>
