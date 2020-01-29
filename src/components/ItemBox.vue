<template>
	<article class="box is-relative">
		<div class="tags x-item-box-tags">
			<span class="tag is-primary is-uppercase">
				{{ normalizedKind }}
			</span>

			<span
				class="tag is-secondary is-uppercase"

				v-if="trackTimeMillis"
			>
				{{ normalizedTrackTime }}
			</span>

			<span
				class="tag is-black"

				v-if="collectionExplicitness || trackExplicitness"
			>
				EXPLÍCITO
			</span>
		</div>

		<div class="media">
			<figure class="media-left">
				<figure class="image is-64x64 is-clipped" v-if="artworkUrl100">
					<img :src="artworkUrl100" alt="Arte do item">
				</figure>

				<span
					class="has-background-white-ter is-64x64 icon image is-flex"

					v-else
				>
					<font-awesome-icon icon="file-image" />
				</span>
			</figure>

			<div class="media-content">
				<div class="content">
					<p>
						<span v-if="wrapperType == 'track'">
							<a :href="[trackViewUrl || collectionViewUrl]" target="_blank">
								<strong>{{ trackCensoredName || trackName }}</strong>
							</a>

							<span v-if="collectionCensoredName || collectionName">
								<br />

								{{ collectionCensoredName || collectionName }}
							</span>
						</span>

						<span v-else>
							<a :href="[trackViewUrl || collectionViewUrl]" target="_blank">
								<strong>
									{{ collectionCensoredName || collectionName }}
								</strong>
							</a>
						</span>

						<small v-if="artistName">
							<br />

							Por:

							<router-link
								:to="{
									name: 'lookup',
									params: {
										query: artistId,
										entity: 'album'
									}
								}"

								v-if="artistId"
							>
								{{ artistName }}
							</router-link>

							<span v-else>
								{{ artistName }}
							</span>
						</small>

						<span v-if="collectionPrice">
							<br />

							<span class="tag is-warning is-uppercase">
								{{ currency }} {{ collectionPrice }}
							</span>
						</span>
					</p>

					<audio class="x-audio" controls v-if="previewUrl">
						<source :src="previewUrl" />

						Your browser does not support the audio element.
					</audio>
				</div>
			</div>
		</div>
	</article>
</template>

<script>
export default {
	computed: {
		normalizedTrackTime() {
			let trackTimeSeconds = this.trackTimeMillis / 1000;
			let trackTimeMinutes = Math.floor(trackTimeSeconds / 60);
			trackTimeMinutes = trackTimeMinutes.toLocaleString(
				'en',
				{ minimumIntegerDigits: 2 }
			)

			trackTimeSeconds = Math.floor(trackTimeSeconds % 60);
			trackTimeSeconds = trackTimeSeconds.toLocaleString(
				'en',
				{ minimumIntegerDigits: 2 }
			)

			return trackTimeMinutes.concat(':', trackTimeSeconds);
		},

		normalizedKind() {
			return this.kind.replace('-', ' ')
		}
	},

	data() {
		return {
			wrapperType: this.itemData['wrapperType'],
			collectionExplicitness: this.itemData['collectionExplicitness'] == 'explicit',
			trackExplicitness: this.itemData['trackExplicitness'] == 'explicit',
			kind: this.itemData['kind'] || this.itemData['collectionType'],
			trackName: this.itemData['trackName'],
			artistName: this.itemData['artistName'],
			artistId: this.itemData['artistId'],
			collectionName: this.itemData['collectionName'],
			trackCensoredName: this.itemData['trackCensoredName'],
			collectionCensoredName: this.itemData['collectionCensoredName'],
			collectionPrice: this.itemData['collectionPrice'],
			currency: this.itemData['currency'],
			artworkUrl100: this.itemData['artworkUrl100'],
			trackViewUrl: this.itemData['trackViewUrl'],
			collectionViewUrl: this.itemData['collectionViewUrl'],
			previewUrl: this.itemData['previewUrl'],
			trackTimeMillis: this.itemData['trackTimeMillis']
		}
	},

	name: 'ItemBox',

	props: ['itemData']
};
</script>

<style>
.x-audio {
	width: 100%;
}

.x-item-box-tags {
	left: 0;
	padding-left: 1.25rem;
	padding-right: 1.25rem;
	position: absolute;
	top: -.75rem;
	width: 100%;
}
</style>
