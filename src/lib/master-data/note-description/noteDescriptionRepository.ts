import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_NOTE_DESCRIPTION} from "$lib/constants"
import {NoteDescription} from "$lib/master-data/note-description/noteDescription"

export default class NoteDescriptionRepository extends MapDatabaseRepository<NoteDescription> {
    protected getId(item: NoteDescription): string {
        return item.id
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_NOTE_DESCRIPTION}`)
    }
}
