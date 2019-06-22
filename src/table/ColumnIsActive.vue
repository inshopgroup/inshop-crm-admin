<template>
  <div>
    <span v-if="data.isActive" class="label label-success">{{
      $t('yes')
    }}</span>
    <span v-else class="label label-danger">{{ $t('no') }}</span>
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
