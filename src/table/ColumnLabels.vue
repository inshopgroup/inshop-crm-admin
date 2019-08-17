<template>
  <div>
    <v-chip
      v-for="label in data.labels"
      :key="label.id"
      color="gray"
      class="ma-1"
    >
      {{ label.name }}
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
