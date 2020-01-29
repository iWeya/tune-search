<template>
	<div class="container">
		<item-box
			v-for="item in itemList.results"
			:key="item.trackId"

			:item-data="item"
		/>
	</div>
</template>

<script>
import ItemBox from './ItemBox'

export default {
	components: {
		ItemBox
	},

	data() {
		return {
		}
	},

	name: 'ItemBoxList',

	props: ['itemList']
};
</script>
