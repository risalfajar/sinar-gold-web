<script lang="ts">
	import {getContext} from "svelte"

	export let label: string
	export let value: any
	export let group: string = ''
	export let checked: boolean = false
	export let name: string = getContext('radio-name')
	export let disabled: boolean = false
</script>

<label class="flex items-center space-x-2">
    <input class="radio transition-all" type="radio" {checked} {disabled} {name} {value} bind:group/>
    <p>{label}</p>
</label>
