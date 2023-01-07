import {ModalSettings} from "@skeletonlabs/skeleton"

export const defaultConfirmationModal: ModalSettings = {
    type: 'confirm',
    title: '',
    body: 'Apakah anda yakin ingin meneruskan?',
    buttonTextCancel: 'Batal',
    buttonTextConfirm: 'Yakin',
    classes: '!max-w-[480px]'
}

export const deleteConfirmationModal: ModalSettings = {
    ...defaultConfirmationModal,
    body: 'Apakah kamu yakin ingin menghapus data ini?',
    buttonTextConfirm: 'Ya, hapus'
}
