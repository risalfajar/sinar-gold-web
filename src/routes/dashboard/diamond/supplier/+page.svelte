<script lang="ts">
    import DiamondSupplierRepository from "$lib/diamond/supplier/supplierRepository"
    import {schema} from "./schema"
    import DiamondPage from "../DiamondPage.svelte"

    const repository = new DiamondSupplierRepository()
</script>

<DiamondPage {repository} {schema}/>
