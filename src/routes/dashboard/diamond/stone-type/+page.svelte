<script lang="ts">
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"
    import DiamondStoneTypeRepository from "$lib/diamond/stone-type/repository"

    const repository = new DiamondStoneTypeRepository()
</script>

<DiamondPage {repository} {schema}/>
