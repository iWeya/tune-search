<template>
	<div class="is-relative">
		<nav class="has-shadow is-fixed-top navbar">
			<div class="container">
				<div class="navbar-brand x-is-fullwidth">
					<router-link class="navbar-item" to="/">
						<img src="../assets/logo-small.min.svg">
					</router-link>

					<form class="navbar-item is-expanded" action="" @submit="updateQuery">
						<fieldset class="x-is-fullwidth" :disabled="isSearching">
							<div class="field has-addons">
								<div class="control is-expanded">
									<input
										class="input"
										autocomplete="on"
										placeholder="Pesquise por álbuns, artistas ou músicas"
										required

										v-model="query"
									>
								</div>

								<div class="control">
									<button
										title="Pesquisar"
										type="submit"

										:class="[
											'button',
											{'is-loading': isSearching},
											'is-primary',
											'x-rainbow-background'
										]"
									>
										<span class="icon">
											<font-awesome-icon icon="search" />
										</span>
									</button>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</nav>

		<div
			class="section x-section"

			v-if="itemList.resultCount"
		>
			<pagination-section
				:disabled="isSearching"
				:item-count="itemList.resultCount"
				:offset="offset"
			/>

			<item-box-list :item-list="this.itemList" />

			<hr />

			<pagination-section
				:item-count="itemList.resultCount"
				:offset="offset"
			/>

			<img
				class="x-decorative-image x-decorative-image--foter"
				alt=""
				src="../assets/footer.min.svg"
			>
		</div>

		<div
			class="hero is-fullheight-with-navbar"

			v-if="itemList.resultCount == 0"
		>
			<div class="has-text-centered hero-body">
				<p class="is-4 title x-is-fullwidth">
					<font-awesome-icon icon="folder-open" />

					<br />

					Não há itens a exibir.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import ItemBoxList from '../components/ItemBoxList';
import PaginationSection from '../components/PaginationSection'

export default {
	beforeRouteUpdate(to, from, next) {
		this.offset = to.params.offset
		this.query = to.params.query

		this.search()

		window.scrollTo(0, 0)

		next()
	},

	mounted() {
		if (!this.query.trim()) {
			this.$router.go(-1);
		}

		this.search();

		document.body.classList.toggle('has-navbar-fixed-top')
	},

	components: {
		ItemBoxList,
		PaginationSection
	},

	data() {
		return {
			itemList: {},
			isSearching: false,
			offset: this.$route.params.offset || 0,
			query: this.$route.params.query
		}
	},

	destroyed() {
		document.body.classList.toggle('has-navbar-fixed-top')
	},

	methods: {
		updateQuery() {
			this.$router.push({
				name: this.$route.name,
				params: {
					offset: 0,
					query: this.query
				}
			})
		},

		search() {
			this.isSearching = true

			this.$axios
				.get('https://itunes.apple.com/search', {
					params: {
						term: this.query,
						limit: 10,
						offset: this.offset
					}
				})
				.then(response => (this.itemList = response.data))
				.finally(() => (this.isSearching = false))
		}
	},

	name: 'search'
};
</script>

<style>
.x-section {
	padding-top: 1.5rem;
}

.x-decorative-image--foter {
	bottom: 0;
	left: 0;
	position: absolute;
}
</style>
