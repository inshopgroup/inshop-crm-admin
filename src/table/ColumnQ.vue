<template>
  <div>
    <router-link :to="{ name: data['type'] + 'Show', params: { id: data['entityId'] }}">
      {{ data['text'] }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
