<script lang="ts">
    export let dark: boolean = false
</script>

<label class="label {dark ? 'text-white' : ''} {$$props.class}">
    <slot/>
</label>
