<template>
  <div>
    <router-link :to="{ name, params: { id: data['entityId'] } }">
      {{ data['search'] }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    name() {
      return this.data.type.toLowerCase() + '-id-show___en'
    },
  },
}
</script>
