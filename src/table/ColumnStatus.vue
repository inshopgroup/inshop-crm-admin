<template>
  <span v-if="data['status']">
    {{data['status']['name']}}
  </span>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
