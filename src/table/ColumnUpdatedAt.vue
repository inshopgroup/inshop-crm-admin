<template>
  <div>
    {{ moment(data['updatedAt']).format('DD-MM-YYYY HH:mm') }}
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['data', 'index', 'column']
}
</script>
