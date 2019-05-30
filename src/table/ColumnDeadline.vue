<template>
  <div>
    {{ crmDateFormat(data['deadline']) }}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
