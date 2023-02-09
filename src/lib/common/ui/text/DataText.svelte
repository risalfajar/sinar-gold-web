<script lang="ts">
    export let title = ''
    export let content = ''
</script>

<div {...$$restProps} class="flex flex-col {$$props.class}">
    <span>{title}</span>
    <span class="text-gray-700">{content}</span>
</div>
