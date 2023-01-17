<script lang="ts">
    import {schema} from "./schema"
    import EditDialog from "./EditDialog.svelte"
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import DiamondShapeRepository from "$lib/diamond/shape/shapeRepository"

    const repository = new DiamondShapeRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog} enableImport={false}/>
