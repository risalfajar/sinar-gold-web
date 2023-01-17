<script lang="ts">
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"
    import DiamondKindRepository from "$lib/diamond/kind/repository"

    const repository = new DiamondKindRepository()
</script>

<DiamondPage {repository} {schema}/>
