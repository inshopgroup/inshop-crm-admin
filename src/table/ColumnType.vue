<template>
  <span v-if="data['type']">
    {{ data['type']['name'] }}
  </span>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
