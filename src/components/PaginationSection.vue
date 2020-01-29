<template>
	<div class="level is-mobile">
		<div class="level-left">
			<button
				class="button pagination-previous"
				:disabled="offset < 10 || disabled"

				@click="previous"
			>
				<font-awesome-icon icon="arrow-left" />
			</button>
		</div>

		<div class="level-right">
			<button
				class="button pagination-previous"
				:disabled="itemCount < 10 || disabled"

				@click="next"
			>
				<font-awesome-icon icon="arrow-right" />
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		}
	},

	methods: {
		next() {
			this.updateParams(this.offset + 10)
		},

		previous() {
			this.updateParams(this.offset - 10)
		},

		updateParams(newOffset) {
			this.$router.replace({
				name: this.$route.name,
				params: {
					offset: newOffset,
					query: this.$route.params.query
				}
			})
		}
	},

	name: 'PaginationSection',

	props: ['disabled', 'itemCount', 'offset']
};
</script>
