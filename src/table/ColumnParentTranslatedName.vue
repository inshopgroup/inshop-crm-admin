<template>
  <div v-if="data.parent">
    {{ translation(data.parent).name }}
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['data', 'index', 'column']
}
</script>
