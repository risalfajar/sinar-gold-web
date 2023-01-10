<div class="w-full space-y-4">
    <div class="flex flex-row flex-wrap justify-between items-center gap-2">
        <div>
            <slot name="search"/>
        </div>
        <div class="flex flex-row gap-2 items-center">
            <slot name="buttons"/>
        </div>
    </div>
    <slot/>
</div>
