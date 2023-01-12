<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import PointRepository from "$lib/master-data/point/pointRepository"

    const repository = new PointRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="groupCode" editDialog={EditDialog}/>
