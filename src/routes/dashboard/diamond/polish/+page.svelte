<script lang="ts">
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"
    import DiamondPolishRepository from "$lib/diamond/polish/repository"

    const repository = new DiamondPolishRepository()
</script>

<DiamondPage {repository} {schema}/>
