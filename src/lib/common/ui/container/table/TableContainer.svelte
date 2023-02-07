<div class="w-full space-y-4">
    <div class="flex flex-row flex-wrap justify-between items-end gap-2">
        <div class="flex flex-row flex-grow gap-2 items-center">
            <slot name="search"/>
        </div>
        <div class="flex flex-row flex-grow gap-2 justify-end items-center">
            <slot name="buttons"/>
        </div>
    </div>
    <slot/>
</div>
