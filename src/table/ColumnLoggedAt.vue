<template>
  <div>
    {{ crmDateFormat(data.loggedAt) }}
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
