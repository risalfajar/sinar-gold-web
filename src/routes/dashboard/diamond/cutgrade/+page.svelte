<script lang="ts">
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"
    import DiamondCutGradeRepository from "$lib/diamond/cutgrade/repository"

    const repository = new DiamondCutGradeRepository()
</script>

<DiamondPage {repository} {schema}/>
