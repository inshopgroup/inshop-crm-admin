<template>
  <div>
    <div v-for="address in data.addresses">
      <div>{{address.postCode}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
