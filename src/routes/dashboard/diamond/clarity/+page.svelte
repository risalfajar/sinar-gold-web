<script lang="ts">
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"
    import DiamondClarityRepository from "$lib/diamond/clarity/clarityRepository"

    const repository = new DiamondClarityRepository()
</script>

<DiamondPage {repository} {schema}/>
