import {ToastSettings, toastStore} from '@skeletonlabs/skeleton'

export function errorToast(message: string) {
    const t: ToastSettings = {
        message,
        autohide: true,
        timeout: 5000,
        classes: "bg-warning-500 text-on-warning-token"
    }
    toastStore.trigger(t)
}
