<template>
  <is-show-template :fields="fields" entity="Product" :tabs="['tabs_companyProducts', 'tabs_productSellPrices']" :history-key="historyKey">
    <template v-slot:tabs_companyProducts="{ item }">
      <company-products
        :company-products="companyProducts"
        :product="item.id"
        @reloadCompanyProducts="loadCompanyProducts"
      />
    </template>

    <template v-slot:tabs_productSellPrices="{ item }">
      <product-sell-prices
        :product-sell-prices="productSellPrices"
        :product="item.id"
        @reloadProductSellPrices="loadProductSellPrices"
      />
    </template>
  </is-show-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CompanyProducts from './CompanyProducts'
import ProductSellPrices from './ProductSellPrices'

export default {
  components: {
    ProductSellPrices,
    CompanyProducts,
  },
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name',
          type: 'translate'
        },
        {
          property: 'ean',
        },
        {
          property: 'brand',
          path: 'brand.name'
        },
        {
          property: 'video',
        },
        {
          property: 'description',
          type: 'translate'
        }
      ]
    }
  },
  computed: mapGetters({
    item: 'product/item',
    companyProducts: 'product/companyProducts',
    productSellPrices: 'product/productSellPrices'
  }),
  created() {
    this.getItem(this.$route.params.id)
    this.loadCompanyProducts(this.$route.params.id)
    this.loadProductSellPrices(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'product/getItem',
      reset: 'product/reset',
      getCompanyProducts: 'product/getCompanyProducts',
      getProductSellPrices: 'product/getProductSellPrices'
    }),
    loadCompanyProducts() {
      this.getCompanyProducts(this.$route.params.id)
    },
    loadProductSellPrices() {
      this.getProductSellPrices(this.$route.params.id)
    }
  }
}
</script>
