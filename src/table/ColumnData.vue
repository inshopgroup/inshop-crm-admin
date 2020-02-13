<template>
  <div style="width: 400px;">
    <ul>
      <li v-for="(value, property) in data.data" :key="property + data.id">
        <b>{{ propName(property) }}:</b> {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    path() {
      if (this.data.objectClass) {
        return this.data.objectClass
          .split('\\')
          .slice(-1)[0]
          .toLowerCase()
      }

      return ''
    }
  },
  methods: {
    propName(property) {
      const label = this.$t(property)

      if (label.name) {
        return label.name
      }

      if (label.value) {
        return label.value
      }

      return label
    }
  }
}
</script>
