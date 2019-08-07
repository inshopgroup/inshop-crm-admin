<template>
  <v-alert type="error" v-if="error">
    {{ error }}
  </v-alert>
</template>

<script>
export default {
  name: 'ItemErrors',
  props: {
    entity: {
      type: String,
      default: null
    }
  },
  computed: {
    error() {
      return this.$store.getters[this.entity + '/error']
    }
  }
}
</script>
