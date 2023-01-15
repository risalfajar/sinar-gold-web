<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import SalesmanRepository from "$lib/master-data/salesman/salesmanRepository"

    const repository = new SalesmanRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
