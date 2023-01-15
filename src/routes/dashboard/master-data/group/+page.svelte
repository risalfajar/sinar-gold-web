<script lang="ts">
    import GroupRepository from "$lib/master-data/group/groupRepository"
    import EditDialog from './EditDialog.svelte'
    import {schema} from "./schema"
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"

    const repository = new GroupRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="name" editDialog={EditDialog}/>
