<template>
  <div class="column-center">
    {{ crmDateFormat(data['updatedAt']) }}
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
