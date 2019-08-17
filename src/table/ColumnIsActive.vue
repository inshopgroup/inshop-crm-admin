<template>
  <v-chip :color="data.isActive ? 'green' : 'red'" text-color="white">
    {{ data.isActive ? $t('yes') : $t('no') }}
  </v-chip>
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
