<template>
  <div>
    {{ moment(data['deadline']).format('DD-MM-YYYY') }}
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['data', 'index', 'column']
}
</script>
