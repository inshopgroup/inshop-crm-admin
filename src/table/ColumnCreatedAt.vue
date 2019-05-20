<template>
  <div>
    {{ dateFormat(data['createdAt']) }}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
