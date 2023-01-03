<script lang="ts">
    import TextInput from "$lib/ui/form/TextInput.svelte"
    import FormDialog from "$lib/ui/dialog/FormDialog.svelte"
    import PasswordInput from "$lib/ui/form/PasswordInput.svelte"
    import {onMount} from "svelte"
    import {MIN_PASSWORD_LENGTH} from "$lib/constants"
    import Select from "$lib/ui/form/Select.svelte"
    import Label from "$lib/ui/form/Label.svelte"
    import Checkbox from "$lib/ui/form/Checkbox.svelte"
    import CheckboxGroup from "$lib/ui/form/CheckboxGroup.svelte"
    import {difference, uniq} from "lodash-es"
    import {AccordionItem, modalStore} from "@skeletonlabs/skeleton"
    import {errorToast, successToast} from "$lib/utils/toastUtils"
    import {Role} from "./types/role"
    import {UserRepository} from "./data/userRepository"
    import {User} from "./types/user"
    import {menus as menusSource} from "../dashboard/data/menus"

    const repository = new UserRepository()
    const menus = menusSource.filter(it => it.title !== 'Beranda')
    const menuGroups = getMenuGroups()
    const defaultData: Omit<User, "role"> & { role: string } = {
        username: "",
        name: "",
        password: "",
        role: "",
        pages: []
    }

    export {dataArgs as data}

    let dataArgs: User | null = null
    let data = defaultData
    let passwordConfirmation = ''
    let isSaving = false

    $: isEditMode = dataArgs != null
    $: isFormValid = data.username.length > 0
        && data.name.length > 0
        && data.password.length >= MIN_PASSWORD_LENGTH
        && data.password === passwordConfirmation
        && Object.values(Role).includes(data.role)

    onMount(() => {
        if (dataArgs) data = {...dataArgs}
    })

    function getMenuGroups() {
        const record: Record<string, string[]> = {}
        menus
            .filter(it => it.subMenus && it.subMenus.length > 0)
            .forEach(it => record[it.title] = it.subMenus!.map(sub => sub.title))
        return record
    }

    function toggleGroup(checked: boolean, title: string) {
        if (checked)
            data.pages = uniq(data.pages.concat(menuGroups[title]))
        else
            data.pages = difference(data.pages, menuGroups[title])
    }

    async function save() {
        isSaving = true
        try {
            await repository.save(data as User)
            successToast('Berhasil membuat user')
            modalStore.close()
        } catch (err) {
            console.error(err)
            errorToast('Gagal membuat user')
        }
        isSaving = false
    }
</script>

<FormDialog {isFormValid} {isSaving} on:save={save}>
    <TextInput label="Username" disabled={isEditMode} bind:value={data.username}/>
    <TextInput label="Nama Lengkap" bind:value={data.name}/>
    <PasswordInput bind:value={data.password}/>
    <PasswordInput label="Konfirmasi Password" hint="Konfirmasi Ulang Password" showHelperText={false} bind:value={passwordConfirmation}/>
    <Select label="Role" options={Object.values(Role)} bind:value={data.role}/>
    <Label>Hak Akses</Label>
    <div class="flex flex-col gap-2">
        <Checkbox disabled checked label="Beranda"/>
        {#each menus as menu (menu.title)}
            {#if (menu.subMenus?.length ?? 0) === 0}
                <CheckboxGroup label={menu.title} bind:group={data.pages}/>
            {:else}
                <AccordionItem regionSummary="pr-4 hover:bg-surface-100 rounded-md transition">
                    <Checkbox slot="summary"
                              label={menu.title}
                              checked={menuGroups[menu.title].every(it => data.pages.includes(it))}
                              on:change={(e) => toggleGroup(e.target.checked, menu.title)}/>
                    <div class="flex flex-col gap-2 py-1 pl-8" slot="content">
                        {#each menu.subMenus as subMenu (subMenu.title)}
                            <CheckboxGroup label={subMenu.title} bind:group={data.pages}/>
                        {/each}
                    </div>
                </AccordionItem>
            {/if}
        {/each}
    </div>
</FormDialog>
