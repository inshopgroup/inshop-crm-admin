<template>
  <div>
    {{ translation(data).name }}
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['data', 'index', 'column']
}
</script>
