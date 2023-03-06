<script lang="ts">
	import TextInput from "$lib/common/ui/form/TextInput.svelte"
	import FormDialogContent from "$lib/common/ui/dialog/FormDialogContent.svelte"
	import PasswordInput from "$lib/common/ui/form/PasswordInput.svelte"
	import {onMount} from "svelte"
	import {MIN_PASSWORD_LENGTH} from "$lib/constants"
	import Select from "$lib/common/ui/form/Select.svelte"
	import Label from "$lib/common/ui/form/Label.svelte"
	import Checkbox from "$lib/common/ui/form/Checkbox.svelte"
	import CheckboxGroup from "$lib/common/ui/form/CheckboxGroup.svelte"
	import {difference, uniq} from "lodash-es"
	import {AccordionItem, modalStore} from "@skeletonlabs/skeleton"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"
	import {Role} from "$lib/users/types/role"
	import {UserRepository} from "$lib/users/data/userRepository"
	import {User} from "$lib/users/types/user"
	import {menus as menusSource} from "$lib/dashboard/menus"
	import {slide} from "svelte/transition"

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
        && (isEditMode || data.password.length >= MIN_PASSWORD_LENGTH)
        && data.password === passwordConfirmation
        && Object.values(Role).includes(data.role)

    onMount(() => {
        if (dataArgs) data = {...dataArgs}
    })

    function getMenuGroups() {
        const record: Record<string, string[]> = {}
        menus
            .filter(it => it.subMenus && it.subMenus.length > 0)
            .forEach(it => record[it.title] = it.subMenus!.map(sub => sub.link))
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
            if (isEditMode)
                await repository.update(data as User)
            else
                await repository.create(data as User)
            successToast('Berhasil menyimpan user')
            modalStore.close()
        } catch (err) {
            console.error(err)
            errorToast('Gagal menyimpan user')
        }
        isSaving = false
    }
</script>

<FormDialogContent {isFormValid} {isSaving} on:save={save}>
    <TextInput label="Username" disabled={isEditMode} bind:value={data.username}/>
    <TextInput label="Nama Lengkap" bind:value={data.name}/>
    <PasswordInput bind:value={data.password}/>
    <PasswordInput label="Konfirmasi Password" hint="Konfirmasi Ulang Password" showHelperText={false} bind:value={passwordConfirmation}/>
    <Select label="Role" options={Object.values(Role)} bind:value={data.role}/>
    {#if data.role !== Role.CRAFTSMAN}
        <div transition:slide|local>
            <Label>Hak Akses</Label>
            <div class="flex flex-col gap-2">
                <Checkbox disabled checked label="Beranda"/>
                {#each menus as menu (menu.title)}
                    {#if (menu.subMenus?.length ?? 0) === 0}
                        <CheckboxGroup label={menu.title} value={menu.link} bind:group={data.pages}/>
                    {:else}
                        <AccordionItem regionPanel="pr-4 hover:bg-surface-100 rounded-md transition">
                            <Checkbox slot="summary"
                                      label={menu.title}
                                      checked={menuGroups[menu.title].every(it => data.pages.includes(it))}
                                      on:click={(e) => e.stopPropagation()}
                                      on:change={(e) => toggleGroup(e.target.checked, menu.title)}/>
                            <div class="flex flex-col gap-2 py-1 pl-8" slot="content">
                                {#each menu.subMenus as subMenu (subMenu.title)}
                                    <CheckboxGroup label={subMenu.title} value={subMenu.link} bind:group={data.pages}/>
                                {/each}
                            </div>
                        </AccordionItem>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</FormDialogContent>
