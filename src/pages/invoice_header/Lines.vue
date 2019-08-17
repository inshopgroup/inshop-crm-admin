<template>
  <is-table v-if="lines.length" :headers="headers" :items="lines" />
</template>

<script>
export default {
  name: 'Lines',
  props: {
    lines: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: this.$t('id'), value: 'id' },
        {
          text: this.$t('product'),
          value: 'product.id',
          link: {
            route: 'ProductShow',
            param: 'product.id'
          }
        },
        { text: this.$t('name'), value: 'name' },
        {
          text: this.$t('vat'),
          value: 'vat.name',
          path: 'vat.name',
          link: {
            route: 'VatShow',
            param: 'vat.id'
          }
        },
        { text: this.$t('unitPriceNetto'), value: 'unitPriceNetto' },
        { text: this.$t('unitsCount'), value: 'unitsCount' },
        {
          text: this.$t('createdAt'),
          value: 'createdAt',
          type: 'datetime',
          sortable: false
        },
        {
          text: this.$t('updatedAt'),
          value: 'updatedAt',
          type: 'datetime',
          sortable: false
        }
      ]
    }
  }
}
</script>
