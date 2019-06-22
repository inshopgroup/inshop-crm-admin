<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.name }}</h1>
    </section>
    <section class="content">
      <item-errors entity="product" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a
              href="#general"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_general') }}</a>
          </li>
          <li>
            <a
              href="#companyProducts"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_companyProducts') }}</a>
          </li>
          <li>
            <a
              href="#productSellPrices"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_productSellPrices') }}</a>
          </li>
          <li>
            <a
              href="#history"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_history') }}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div
            id="general"
            class="tab-pane active"
          >
            <div
              v-if="item"
              class="table-responsive"
            >
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th width="20%">
                      {{ $t('field') }}
                    </th>
                    <th>{{ $t('value') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ $t('name') }}</td>
                    <td>{{ translate(item).name }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('ean') }}</td>
                    <td>{{ item.ean }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('video') }}</td>
                    <td>
                      <a
                        target="_blank"
                        :href="item.video"
                      >{{ item.video }}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('description') }}</td>
                    <td>{{ translate(item).description }}</td>
                  </tr>

                  <show-row-is-active :item="item" />
                  <show-row-created-at :item="item" />
                  <show-row-updated-at :item="item" />
                  <show-row-updated-by :item="item" />
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="companyProducts"
            class="tab-pane"
          >
            <company-products
              :company-products="companyProducts"
              :product="item.id"
              @reloadCompanyProducts="loadCompanyProducts"
            />
          </div>
          <div
            id="productSellPrices"
            class="tab-pane"
          >
            <product-sell-prices
              :product-sell-prices="productSellPrices"
              :product="item.id"
              @reloadProductSellPrices="loadProductSellPrices"
            />
          </div>
          <div
            id="history"
            class="tab-pane"
          >
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Product"
              path="product"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        entity="Product"
        path="product"
      />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'
import CompanyProducts from './CompanyProducts'
import ProductSellPrices from './ProductSellPrices'
import ShowRowIsActive from "../../components/Show/ShowRowIsActive"
import ShowRowCreatedAt from "../../components/Show/ShowRowCreatedAt"
import ShowRowUpdatedAt from "../../components/Show/ShowRowUpdatedAt"
import ShowRowUpdatedBy from "../../components/Show/ShowRowUpdatedBy"

export default {
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive,
    ProductSellPrices,
    CompanyProducts,
    History,
    ItemErrors,
    ItemShowActions
  },
  data () {
    return {
      historyKey: 1
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
  beforeDestroy () {
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
