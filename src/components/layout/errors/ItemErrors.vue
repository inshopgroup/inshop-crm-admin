<template>
  <v-col v-if="error" cols="12">
    <v-alert type="error">
      {{ error }}
    </v-alert>
  </v-col>
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
