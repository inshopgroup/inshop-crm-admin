<template>
  <div>
    <div v-for="group in data.groups" :key="group.id">
      <i class="fa fa-user" aria-hidden="true" />

      {{ group.name }}
    </div>
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
