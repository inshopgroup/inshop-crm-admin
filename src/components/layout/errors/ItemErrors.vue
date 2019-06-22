<template>
  <div
    v-if="error"
    class="callout callout-danger"
  >
    <h4>Warning!</h4>
    <p>{{ error }}</p>
  </div>
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
