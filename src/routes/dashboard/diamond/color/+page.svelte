<script lang="ts">
    import {schema} from "./schema"
    import EditDialog from "./EditDialog.svelte"
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import DiamondColorRepository from "$lib/diamond/color/colorRepository"

    const repository = new DiamondColorRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog} enableImport={false}/>
