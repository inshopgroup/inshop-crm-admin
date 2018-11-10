<template>
  <span v-if="data['type']">
    {{data['type']['name']}}
  </span>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
