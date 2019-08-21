<template>
  <div class="column-center">
    <v-chip :color="data.isActive ? 'green' : 'red'" text-color="white">
      {{ data.isActive ? $t('yes') : $t('no') }}
    </v-chip>
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
