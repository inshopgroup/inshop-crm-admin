<template>
  <is-table
      :headers="headers"
      :items="items"
      :hide-default-footer="true"
  >
    <template v-slot:item.key="{ value }">
      {{ value }}
    </template>
  </is-table>
</template>

<script>
export default {
  name: 'IsKeyTable',
  props: {
    item: {
      type: Object,
      required: true,
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
        },
      ],
    }
  },
  computed: {
    items() {
      let arr = []

      this.fields.forEach(field => {
        arr.push({
          key: this.$t(field.value),
          val: this.item[field.value],
          type: field.type
        })
      })

      return arr
    }
  },
}
</script>
