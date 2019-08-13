<template>
  <is-table
      :headers="headers"
      :items="items"
      :hide-default-footer="true"
  >
    <template v-slot:item.key="{ item }">
      {{ $t(item.path.replace(/\./g, '_')) }}
    </template>
  </is-table>
</template>

<script>
export default {
  name: 'IsKeyTable',
  props: {
    item: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('field'),
          value: 'key',
        },
        {
          text: this.$t('value'),
          value: 'val',
        }
      ],
    }
  },
  computed: {
    items() {
      let arr = []

      this.fields.forEach(field => {
        arr.push({
          [field.property]: this.item[field.property],
          path: (field.path || field.property),
          propertyType: field.type,
          link: field.link,
        })
      })

      return arr
    }
  },
}
</script>
