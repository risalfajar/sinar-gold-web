<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import NoteDescriptionRepository from "$lib/master-data/note-description/noteDescriptionRepository"

    const repository = new NoteDescriptionRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="groupCode" editDialog={EditDialog}/>
