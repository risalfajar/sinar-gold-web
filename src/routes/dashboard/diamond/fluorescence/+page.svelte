<script lang="ts">
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"
    import DiamondFluorescenceRepository from "$lib/diamond/flourescence/repository"

    const repository = new DiamondFluorescenceRepository()
</script>

<DiamondPage {repository} {schema}/>
