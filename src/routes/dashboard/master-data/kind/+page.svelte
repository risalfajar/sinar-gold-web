<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import KindRepository from "$lib/master-data/kind/kindRepository"

    const repository = new KindRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="name" editDialog={EditDialog}/>
