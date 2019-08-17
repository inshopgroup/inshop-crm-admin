<template>
  <is-table
    v-if="productSellPrices.length"
    :headers="headers"
    :items="productSellPrices"
  />
</template>

<script>
export default {
  name: 'ProductSellPrices',
  props: {
    productSellPrices: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: this.$t('id'), value: 'id' },
        {
          text: this.$t('company_product_name'),
          value: 'companyProduct.company.name'
        },
        { text: this.$t('channel_name'), value: 'channel.name' },
        { text: this.$t('currency_name'), value: 'channel.currency.name' },
        { text: this.$t('vat_name'), value: 'vat.name' },
        { text: this.$t('price_sell_brutto'), value: 'priceSellBrutto' },
        { text: this.$t('price_old_sell_brutto'), value: 'priceOldSellBrutto' },
        {
          text: this.$t('active_from'),
          value: 'activeFrom',
          type: 'datetime',
          sortable: false
        },
        {
          text: this.$t('active_to'),
          value: 'activeTo',
          type: 'datetime',
          sortable: false
        },
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
