<script>
    import {Router} from "@roxi/routify"
    import {routes} from "../.routify/routes"
    import {Modal, Toast} from "@skeletonlabs/skeleton"
</script>

<Modal background="bg-white" rounded="rounded-xl" regionHeader="text-xl font-bold"/>
<Toast buttonDismiss="btn-ringed-surface"/>
<Router {routes}/>
