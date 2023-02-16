import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
import {get} from "svelte/store"

export const defaultConfirmationModal: ModalSettings = {
    type: 'confirm',
    title: '',
    body: 'Apakah anda yakin ingin meneruskan?',
    buttonTextCancel: 'Batal',
    buttonTextConfirm: 'Yakin',
    modalClasses: '!max-w-[480px]'
}

export const deleteConfirmationModal: ModalSettings = {
    ...defaultConfirmationModal,
    body: 'Apakah kamu yakin ingin menghapus data ini?',
    buttonTextConfirm: 'Ya, hapus'
}

export function triggerModal(modal: ModalSettings) {
    modalStore.trigger(modal)
}

// Change default Queue based modal to Stack based modal
export function closeModal(response?: any) {
    const store = get(modalStore)
    const lastStore = store[store?.length - 1]
    lastStore.response?.(response)
    modalStore.update(store => {
        store.pop()
        return store
    })
}
