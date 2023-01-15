<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import TagRepository from "$lib/master-data/tag/tagRepository"

    const repository = new TagRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
