<script lang="ts">
    import Checkbox from "src/lib/ui/form/Checkbox.svelte"

    export let label
    export let group = []
    export let value = label

    function onChange({target}) {
        const {value, checked} = target
        if (checked) {
            group = [...group, value]
        } else {
            group = group.filter((item) => item !== value)
        }
    }
</script>

<Checkbox {...$$restProps}
          {value}
          {label}
          checked={group.includes(value)}
          on:change={onChange}/>
