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
          text: this.$t('status'),
          value: 'status.name',
          link: {
            route: 'OrderLineStatusShow',
            param: 'status.id'
          }
        },
        {
          text: this.$t('product'),
          value: 'productSellPrice.product.id',
          link: {
            route: 'ProductShow',
            param: 'productSellPrice.product.id'
          }
        },
        {
          text: this.$t('vat'),
          value: 'vat.name',
          path: 'vat.name',
          link: {
            route: 'VatShow',
            param: 'vat.id'
          }
        },
        { text: this.$t('priceSellBrutto'), value: 'priceSellBrutto' },
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
