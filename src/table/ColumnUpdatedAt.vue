<template>
  <div>
    {{ dateFormat(data['updatedAt']) }}
  </div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
