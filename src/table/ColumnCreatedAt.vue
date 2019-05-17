<template>
  <div>
    {{ dateFormat(data['createdAt']) }}
  </div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
