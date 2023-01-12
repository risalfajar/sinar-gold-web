<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import CraftsmanRepository from "$lib/master-data/craftsman/craftsmanRepository"

    const repository = new CraftsmanRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="name" editDialog={EditDialog}/>
