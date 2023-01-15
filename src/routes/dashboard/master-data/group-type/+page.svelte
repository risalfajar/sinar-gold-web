<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import GroupTypeRepository from "$lib/master-data/group-type/groupTypeRepository"

    const repository = new GroupTypeRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="type" editDialog={EditDialog}/>
