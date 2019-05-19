<template>
  <div>
    <div v-for="address in data.addresses" :key="address.id">
      <div>{{address.postCode}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
