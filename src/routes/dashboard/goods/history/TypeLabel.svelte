<script lang="ts">
	import {HistoryType} from "./data/history"

	export let type: HistoryType

	$: label = getLabel(type)

	function getLabel(type: HistoryType) {
		if (type === HistoryType.IN)
			return 'Barang Masuk'
		else if (type === HistoryType.MOVE)
			return 'Barang Pindah'
		else if (type === HistoryType.SOLD)
			return 'Barang Terjual'
	}
</script>

<span
        class="rounded-lg px-2 py-1 text-sm font-bold"
        class:bg-blue-100={type === HistoryType.IN}
        class:text-blue-500={type === HistoryType.IN}
        class:bg-primary-100={type === HistoryType.MOVE}
        class:text-primary-500={type === HistoryType.MOVE}
        class:bg-green-100={type === HistoryType.SOLD}
        class:text-green-500={type === HistoryType.SOLD}>
    {label}
</span>
