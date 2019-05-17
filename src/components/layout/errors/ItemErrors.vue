<template>
  <div class="callout callout-danger" v-if="error">
    <h4>Warning!</h4>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'ItemErrors',
  props: {
    entity: null
  },
  computed: {
    error() {
      return this.$store.getters[this.entity + '/error']
    }
  },
}
</script>
