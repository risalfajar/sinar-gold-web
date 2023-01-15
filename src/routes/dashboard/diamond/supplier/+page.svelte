<script lang="ts">
    import DiamondSupplierRepository from "$lib/diamond/supplier/supplierRepository"
    import {schema} from "./schema"
    import EditDialog from "./EditDialog.svelte"
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"

    const repository = new DiamondSupplierRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog} enableImport={false}/>
