<script lang="ts">
	import Label from "$lib/common/ui/form/Label.svelte"
	import {setContext} from "svelte"

	export let label: string
	export let name: string

	$: setContext('radio-name', name)
</script>

<div class="flex flex-col">
    <Label>{label}</Label>
    <div class="flex flex-grow items-center gap-2">
        <slot/>
    </div>
</div>
