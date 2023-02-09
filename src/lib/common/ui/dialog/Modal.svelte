<script>
    import {createEventDispatcher} from 'svelte'
    import {fade, fly} from 'svelte/transition'
    import {focusTrap, modalStore} from "@skeletonlabs/skeleton"
    import {closeModal} from "$lib/common/utils/modalUtils"
    // Event Handler
    const dispatch = createEventDispatcher()
    // Props
    /** The open/close animation duration. Set '0' (zero) to disable. */
    export let duration = 150
    // Props (modal)
    /** Provide classes to style the modal background. */
    export let background = 'bg-surface-100-800-token'
    /** Provide classes to style the modal width. */
    export let width = 'w-full max-w-[640px]'
    /** Provide classes to style the modal. */
    export let height = 'h-auto'
    /** Provide classes to style the modal padding. */
    export let padding = 'p-4'
    /** Provide classes to style the modal spacing. */
    export let spacing = 'space-y-4'
    /** Provide classes to style the modal border radius. */
    export let rounded = 'rounded-container-token'
    /** Provide classes to style modal box shadow. */
    export let shadow = 'shadow-xl'
    // Props (buttons)
    /** Provide classes for neutral buttons, such as Cancel. */
    export let buttonNeutral = 'btn-ghost-surface'
    /** Provide classes for positive actions, such as Confirm or Submit. */
    export let buttonPositive = 'variant-filled-primary'
    /** Override the text for the Cancel button. */
    export let buttonTextCancel = 'Cancel'
    /** Override the text for the Confirm button. */
    export let buttonTextConfirm = 'Confirm'
    /** Override the text for the Submit button. */
    export let buttonTextSubmit = 'Submit'
    // Props (regions)
    /** Provide classes to style the backdrop. */
    export let regionBackdrop = 'bg-surface-backdrop-token'
    /** Provide arbitrary classes to modal header region. */
    export let regionHeader = 'text-2xl font-bold'
    /** Provide arbitrary classes to modal body region. */
    export let regionBody = 'max-h-[200px] overflow-hidden'
    /** Provide arbitrary classes to modal footer region. */
    export let regionFooter = 'flex justify-end space-x-2'
    // Base Styles
    const cBackdrop = 'fixed top-0 left-0 right-0 bottom-0 z-[700] flex justify-center items-center p-4'
    const cModalImage = 'w-full h-auto'
    // Local
    let promptValue
    const buttonTextDefaults = {
        buttonTextCancel,
        buttonTextConfirm,
        buttonTextSubmit
    }
    // Modal Store Subscription
    modalStore.subscribe((dArr) => {
        if (!dArr.length)
            return
        const lastIndex = dArr.length - 1
        // Set Prompt input value and type
        promptValue = dArr[lastIndex].value
        // Override button text per instance, if available
        buttonTextCancel = dArr[lastIndex].buttonTextCancel || buttonTextDefaults.buttonTextCancel
        buttonTextConfirm = dArr[lastIndex].buttonTextConfirm || buttonTextDefaults.buttonTextConfirm
        buttonTextSubmit = dArr[lastIndex].buttonTextSubmit || buttonTextDefaults.buttonTextSubmit
    })

    // Event Handlers ---
    function onBackdropInteraction(event) {
        if (!(event.target instanceof Element))
            return
        if (event.target.classList.contains('modal-backdrop'))
            getLastModal().meta?.mandatory || onClose()
        /** @event {{ event }} backdrop - Fires on backdrop interaction.  */
        dispatch('backdrop', event)
    }

    function onClose() {
        closeModal(false)
    }

    function onConfirm() {
        closeModal(true)
    }

    function onPromptSubmit() {
        closeModal(promptValue)
    }

    // A11y ---
    function onKeyDown(event) {
        if (!$modalStore.length)
            return
        if (event.code === 'Escape')
            getLastModal().meta?.mandatory || onClose()
    }

    function getLastModal() {
        return $modalStore[$modalStore.length - 1]
    }

    // Reactive
    $: classesBackdrop = `${cBackdrop} ${regionBackdrop} ${$$props.class || ''}`
    $: classesModal = `${background} ${width} ${height} ${padding} ${spacing} ${rounded} ${shadow}`
    // IMPORTANT: add values to pass to the children templates.
    // There is a way to self-reference component values, but it involes svelte-internal and is not yet stable.
    // REPL: https://svelte.dev/repl/badd0f11aa99450ca69dca6690d4d5a4?version=3.52.0
    // Source: https://discord.com/channels/457912077277855764/1037768846855118909
    $: parent = {
        background,
        width,
        height,
        padding,
        spacing,
        rounded,
        shadow,
        // ---
        buttonNeutral,
        buttonPositive,
        buttonTextCancel,
        buttonTextConfirm,
        buttonTextSubmit,
        // ---
        regionBackdrop,
        regionHeader,
        regionBody,
        regionFooter,
        // ---
        onClose
    }
</script>

<svelte:window on:keydown={onKeyDown}/>

{#each $modalStore as store, index}
    <!-- Backdrop -->
    <div
            class="modal-backdrop {classesBackdrop}"
            on:mousedown={onBackdropInteraction}
            on:touchstart={onBackdropInteraction}
            transition:fade={{ duration }}
            data-testid="modal-backdrop"
    >
        <!-- Modal -->
        <div
                class="modal {classesModal} {store.classes}"
                transition:fly={{ duration, opacity: 0, y: 100 }}
                use:focusTrap={true}
                data-testid="modal"
                role="dialog"
                aria-modal="true"
                aria-label={store.title}
        >
            <!-- Header -->
            {#if store?.title}
                <header class="modal-header {regionHeader}">{@html store.title}</header>
            {/if}
            <!-- Body -->
            {#if store?.body}
                <article class="modal-body {regionBody}">{@html store.body}</article>
            {/if}
            <!-- Image -->
            {#if store?.image && typeof store?.image === 'string'}
                <img class="modal-image {cModalImage}" src={store?.image} alt="Modal"/>
            {/if}
            <!-- Type -->
            {#if store.type === 'alert'}
                <!-- Template: Alert -->
                <footer class="modal-footer {regionFooter}">
                    <!-- prettier-ignore -->
                    <button class="btn {buttonNeutral}" on:click={onClose}>{buttonTextCancel}</button>
                </footer>
            {:else if store.type === 'confirm'}
                <!-- Template: Confirm -->
                <!-- prettier-ignore -->
                <footer class="modal-footer {regionFooter}">
                    <button class="btn {buttonNeutral}" on:click={onClose}>{buttonTextCancel}</button>
                    <button class="btn {buttonPositive}" on:click={onConfirm}>{buttonTextConfirm}</button>
                </footer>
            {:else if store.type === 'prompt'}
                <!-- Template: Prompt -->
                <input class="modal-prompt-input" type="text" bind:value={promptValue}/>
                <!-- prettier-ignore -->
                <footer class="modal-footer {regionFooter}">
                    <button class="btn {buttonNeutral}" on:click={onClose}>{buttonTextCancel}</button>
                    <button class="btn {buttonPositive}" on:click={onPromptSubmit} disabled={!promptValue}>{buttonTextSubmit}</button>
                </footer>
            {:else if store.type === 'component'}
                <!-- Template: Component -->
                <!-- NOTE: users are repsonsible for handling all UI, including cancel/submit buttons -->
                <svelte:component this={store.component?.ref} {...store.component?.props} {parent}>
                    {@html store.component?.slot}
                </svelte:component>
            {/if}
        </div>
    </div>
{/each}
