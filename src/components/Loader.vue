<template>
  <v-overlay :value="isLoading">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-if="isLoading"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'Loader',
  computed: {
    isLoading() {
      return this.$store.state.general.isLoading
    }
  }
}
</script>
