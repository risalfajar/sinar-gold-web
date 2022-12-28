<script lang="ts">
    import {icons} from "src/lib/ui/icon/icons"

    export let name: string

    $: icon = icons.find(icon => icon.name === name)
    $: width = icon?.width ?? 24
    $: height = icon?.height ?? 24
</script>

<svg {width} {height} focusable="false" viewBox="0 0 {width} {height}" class="fill-white {$$props.class}" {...$$restProps}>
    {@html icon?.vector ?? ''}
</svg>
