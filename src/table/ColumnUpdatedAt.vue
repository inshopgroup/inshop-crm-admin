<template>
  <div>
    {{ crmDateFormat(data['updatedAt']) }}
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
