<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import ChamferRepository from "$lib/master-data/chamfer/chamferRepository"

    const repository = new ChamferRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
