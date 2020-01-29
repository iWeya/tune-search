<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~sass-material-colors/sass/sass-material-colors";

// Theme Colors
$black: material-color('grey', '900');
$primary: material-color('teal', '600');
$secondary: material-color('purple', '600');

$custom-colors: ('secondary': $secondary);

// Theme Settings
$radius-small: 0;
$radius: 0;
$radius-large: 0;

// Theme Custom Modifiers
.x-is-fullwidth {
	width: 100%;
}

@import "../node_modules/bulma/bulma.sass";

html {
	background-color: $white-bis;
	overflow: auto;
}

@keyframes rainbow_background {
	from {
		background-color: $primary;
	}

	to {
		background-color: $secondary;
	}
}

.x-rainbow-background {
	animation: rainbow_background 4s linear 0s infinite alternate;
}

.x-decorative-image {
	height: 24px;
	width: 100%;
}
</style>
