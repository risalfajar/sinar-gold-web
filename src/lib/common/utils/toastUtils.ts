import {ToastSettings, toastStore} from '@skeletonlabs/skeleton'

export function successToast(message: string) {
    const t: ToastSettings = {
        message,
        autohide: true,
        timeout: 3000,
        classes: "!bg-success-500 !text-on-success-token"
    }
    toastStore.trigger(t)
}

export function errorToast(message: string) {
    const t: ToastSettings = {
        message,
        autohide: true,
        timeout: 5000,
        classes: "!bg-error-500 !text-on-warning-token"
    }
    toastStore.trigger(t)
}
