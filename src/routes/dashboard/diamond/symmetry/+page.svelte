<script lang="ts">
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"
    import DiamondSymmetryRepository from "$lib/diamond/symmetry/repository.js"

    const repository = new DiamondSymmetryRepository()
</script>

<DiamondPage {repository} {schema}/>
