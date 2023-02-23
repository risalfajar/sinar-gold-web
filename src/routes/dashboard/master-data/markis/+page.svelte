<script lang="ts">
	import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
	import {schema} from "./schema.ts"
	import EditDialog from "./EditDialog.svelte"
	import MarkisRepository from "$lib/master-data/markis/markisRepository"

	const repository = new MarkisRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
