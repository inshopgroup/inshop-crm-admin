<template>
  <div class="column-center">
    {{ crmDateFormat(data['createdAt']) }}
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
