<template>
  <is-table
    v-if="companyProducts.length"
    :headers="headers"
    :items="companyProducts"
  />
</template>

<script>
export default {
  name: 'CompanyProducts',
  props: {
    companyProducts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: this.$t('id'), value: 'id' },
        {
          text: this.$t('company_name'),
          value: 'company.name',
          link: {
            route: 'CompanyShow',
            param: 'company.id'
          }
        },
        { text: this.$t('currency_name'), value: 'currency.name' },
        { text: this.$t('price_buy_netto'), value: 'priceBuyNetto' },
        { text: this.$t('availability'), value: 'availability' },
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
