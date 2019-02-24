<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'product'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('product.tabs.general')}}</a></li>
          <li><a href="#companyProducts" data-toggle="tab" aria-expanded="false">{{$t('product.tabs.companyProducts')}}</a></li>
          <li><a href="#productSellPrices" data-toggle="tab" aria-expanded="false">{{$t('product.tabs.productSellPrices')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <div v-if="item" class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                <tr>
                  <th width="20%">{{$t('field')}}</th>
                  <th>{{$t('value')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{$t('product.name')}}</td>
                  <td>{{ translate(item).name }}</td>
                </tr>
                <tr>
                  <td>{{$t('product.ean')}}</td>
                  <td>{{ item['ean'] }}</td>
                </tr>

                <tr>
                  <td>{{$t('product.video')}}</td>
                  <td><a target="_blank" :href="item['video']">{{ item['video'] }}</a> </td>
                </tr>
                <tr>
                  <td>{{$t('product.description')}}</td>
                  <td>{{ translate(item).description }}</td>
                </tr>

                <tr>
                  <td>{{$t('product.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('product.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('product.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="companyProducts">
            <company-products :companyProducts="companyProducts" :product="item.id" @reloadCompanyProducts="loadCompanyProducts"></company-products>
          </div>
          <div class="tab-pane" id="productSellPrices">
            <product-sell-prices :productSellPrices="productSellPrices" :product="item.id" @reloadProductSellPrices="loadProductSellPrices"></product-sell-prices>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'Product'" :path="'product'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Product'" :path="'product'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import History from '../History'
import CompanyProducts from '../company/CompanyProducts'
import ProductSellPrices from './ProductSellPrices'

export default {
  components: {
    ProductSellPrices,
    CompanyProducts,
    History,
    ItemErrors,
    ItemShowActions
  },

  computed: mapGetters({
    item: 'product/item',
    companyProducts: 'product/show/companyProducts',
    productSellPrices: 'product/show/productSellPrices',
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(this.$route.params.id)
    this.loadCompanyProducts()
    this.loadProductSellPrices()
  },

  methods: {
    ...mapActions({
      reset: 'product/reset',
      getItem: 'product/getItem',
      getCompanyProducts: 'product/show/getCompanyProducts',
      getProductSellPrices: 'product/show/getProductSellPrices',
    }),

    loadCompanyProducts () {
      this.getCompanyProducts(this.$route.params.id)
    },

    loadProductSellPrices () {
      this.getProductSellPrices(this.$route.params.id)
    },
  }
}
</script>
