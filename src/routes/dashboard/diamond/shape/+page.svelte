<script lang="ts">
    import {schema} from "./schema"
    import DiamondShapeRepository from "$lib/diamond/shape/shapeRepository"
    import DiamondPage from "../DiamondPage.svelte"

    const repository = new DiamondShapeRepository()
</script>

<DiamondPage {repository} {schema}/>
