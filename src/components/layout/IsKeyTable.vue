<template>
  <is-table :headers="headers" :items="items" :hide-default-footer="true">
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
    }
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('field'),
          value: 'key',
          sortable: false
        },
        {
          text: this.$t('value'),
          value: 'val',
          sortable: false
        }
      ]
    }
  },
  computed: {
    items() {
      const arr = []

      this.fields.forEach(field => {
        arr.push({
          [field.property]:
            field.type === 'translate'
              ? this.translate(this.item)[field.property]
              : this.item[field.property],
          path: field.path || field.property,
          propertyType: field.type,
          link: field.link,
          params: field.params || {}
        })
      })

      return arr
    }
  }
}
</script>
