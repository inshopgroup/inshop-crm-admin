<template>
  <div>
    <span
      class="label label-success"
      v-if="data.isActive"
    >{{ $t('yes') }}</span>
    <span
      class="label label-danger"
      v-else
    >{{ $t('no') }}</span>
  </div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
