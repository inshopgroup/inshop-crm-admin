<template>
  <div>
    <div v-for="address in data.addresses" :key="address.id">
      <div>{{ address.country.name }}</div>
    </div>
  </div>
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
