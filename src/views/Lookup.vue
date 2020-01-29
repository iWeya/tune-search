<template>
	<div class="is-relative">
		<nav class="has-shadow is-fixed-top navbar">
			<div class="container">
				<div class="navbar-brand x-is-fullwidth">
					<router-link class="navbar-item" to="/">
						<img src="../assets/logo-small.min.svg">
					</router-link>

					<div class="navbar-item">
						<p class="title is-5">
							{{ artistData.artistName }}
						</p>
					</div>
				</div>
			</div>
		</nav>

		<div class="section x-section">
			<div class="field is-grouped is-grouped-centered">
				<div class="control">
					<div class="select">
						<select
							v-model="entity"
							:disabled="isSearching"
							@change="updateQuery"
						>
							<option value="album" :selected="entity == 'album'">
								Álbuns
							</option>

							<option value="song" :selected="entity == 'song'">
								Tracks
							</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<div
			class="section x-section"

			v-if="itemList.resultCount"
		>
			<item-box-list :item-list="this.itemList" />

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
import ItemBoxList from '../components/ItemBoxList'

export default {
	beforeRouteUpdate(to, from, next) {
		this.entity = to.params.entity
		this.query = to.params.query

		this.search()

		window.scrollTo(0, 0)

		next()
	},

	mounted() {
		if (!this.query) {
			this.$router.go(-1);
		}

		this.search();

		document.body.classList.add('has-navbar-fixed-top')
	},

	components: {
		ItemBoxList
	},

	data() {
		return {
			artistData: {},
			itemList: {},
			isSearching: false,
			query: this.$route.params.query,
			entity: this.$route.params.entity
		}
	},

	destroyed() {
		document.body.classList.remove('has-navbar-fixed-top')
	},

	methods: {
		updateQuery() {
			this.$router.push({
				name: this.$route.name,
				params: {
					entity: this.entity,
					query: this.query
				}
			})
		},

		search() {
			this.isSearching = true

			this.$axios
				.get('https://itunes.apple.com/lookup', {
					params: {
						id: this.query,
						offset: 0,
						entity: this.entity
					}
				})
				.then(response => {
					this.itemList = response.data
					this.itemList.results = this.itemList.results.filter(item => {
						return item.wrapperType != 'artist'
					})

					this.artistData = response.data.results[0]
				})
				.finally(() => (this.isSearching = false))
		}
	},

	name: 'lookup'
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
