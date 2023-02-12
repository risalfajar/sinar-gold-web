<script lang="ts">
    import IconButton from "$lib/common/ui/button/IconButton.svelte"
    import {tooltip} from "@skeletonlabs/skeleton"

    export let disabled = false
</script>

<div use:tooltip={{content: disabled ? 'pesanan sudah disetor' : 'setor pesanan', position: 'left', regionTooltip: '!-left-4'}}>
    <IconButton class="variant-outline-surface clickable" on:click {disabled}>
        <i class="material-icons bg-success-500 rounded-full text-white p-1">check</i>
    </IconButton>
</div>
