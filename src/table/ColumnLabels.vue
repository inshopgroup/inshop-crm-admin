<template>
  <div>
    <v-chip color="gray" v-for="label in data.labels" :key="label.id" class="ma-1">
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
