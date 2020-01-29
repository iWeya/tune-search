<template>
	<div class="hero is-fullheight">
		<img class="x-decorative-image" alt="" src="../assets/header.min.svg">

		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-4">
						<main>
							<h1 class="title has-text-centered is-spaced x-logo">
								<img src="../assets/logo-large.min.svg" alt="Logotipo">
							</h1>

							<form class="box" action="" @submit="searchValue">
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
											class="button is-primary x-rainbow-background"
											title="Pesquisar"
											type="submit"
										>
											<span class="icon">
												<font-awesome-icon icon="search" />
											</span>
										</button>
									</div>
								</div>
							</form>
						</main>
					</div>
				</div>
			</div>
		</div>

		<img class="x-decorative-image" alt="" src="../assets/footer.min.svg">
	</div>
</template>

<script>
export default {
	data() {
		return {
			query: ''
		}
	},

	methods: {
		searchValue() {
			this.$router.push({
				name: 'search',
				params: {
					query: this.query
				}
			})
		}
	},

	name: 'home'
};
</script>
