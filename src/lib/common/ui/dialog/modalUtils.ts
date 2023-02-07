import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
import {get} from "svelte/store"

export function triggerModal(modal: ModalSettings) {
    modalStore.trigger(modal)
}

export function triggerTopModal(modal: ModalSettings) {
    modalStore.update(modals => {
        modals.unshift(modal)
        return modals
    })
}

export function closeModal(response?: any) {
    const responseFunc = get(modalStore)[0].response
    responseFunc && responseFunc(response)
    modalStore.close()
}

export function closeTopModal(response?: any) {
    const store = get(modalStore)
    const lastStore = store[store?.length - 1]
    const responseFunc = lastStore.response
    responseFunc && responseFunc(response)
    modalStore.update(store => {
        store.pop()
        return store
    })
}
