<script lang="ts">
    import {schema} from "./schema"
    import DiamondColorRepository from "$lib/diamond/color/colorRepository"
    import DiamondPage from "../DiamondPage.svelte"

    const repository = new DiamondColorRepository()
</script>

<DiamondPage {repository} {schema}/>
