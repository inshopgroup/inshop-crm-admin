<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('order_header.tabs.general')}}</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="order_header_number" class="form-control-label">{{$t('order_header.number')}}</label>
                <input
                        id="order_header_number"
                        v-model="item.number"
                        :class="['form-control', isInvalid('number') ? 'is-invalid' : '']"
                        type="text"
                        placeholder=""
                        @input="handleUpdateField('number', $event.target.value)">
                <div v-if="isInvalid('number')" class="invalid-feedback">{{ violations.number }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="order_header_status" class="form-control-label">{{$t('order_header.status.name')}}</label>
                <v-select
                        id="order_header_status"
                        v-model="item.status"
                        :options="statuses"
                        :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>
                <div v-if="isInvalid('status')" class="invalid-feedback">{{ violations.status }}</div>
              </div>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="order_header_channel" class="form-control-label">{{$t('order_header.channel.name')}}</label>
                <v-select
                        id="order_header_channel"
                        v-model="item.channel"
                        :options="channels"
                        :class="['form-control-select2', isInvalid('channel') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>
                <div v-if="isInvalid('channel')" class="invalid-feedback">{{ violations.channel }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="order_header_client" class="form-control-label">{{$t('order_header.client.name')}}</label>
                <v-select
                        id="order_header_client"
                        v-model="item.client"
                        :options="clients"
                        :class="['form-control-select2', isInvalid('client') ? 'is-invalid' : '']"
                        label="name"
                        @search="loadClients"
                ></v-select>
                <div v-if="isInvalid('client')" class="invalid-feedback">{{ violations.client }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="order_header_paymentType" class="form-control-label">{{$t('order_header.paymentType.name')}}</label>
                <v-select
                        id="order_header_paymentType"
                        v-model="item.paymentType"
                        :options="paymentTypes"
                        :class="['form-control-select2', isInvalid('paymentType') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>
                <div v-if="isInvalid('paymentType')" class="invalid-feedback">{{ violations.paymentType }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="order_header_shipmentMethod" class="form-control-label">{{$t('order_header.shipmentMethod.name')}}</label>
                <v-select
                        id="order_header_shipmentMethod"
                        v-model="item.shipmentMethod"
                        :options="shipmentMethods"
                        :class="['form-control-select2', isInvalid('shipmentMethod') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>
                <div v-if="isInvalid('shipmentMethod')" class="invalid-feedback">{{ violations.shipmentMethod }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('order_header.tabs.lines')}}</h3>
        </div>
        <div class="box-body">

          <button class="btn btn-info" @click.prevent="addLine()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{$t('order_line.add')}}</span>
          </button>

          <table class="table table-striped">
            <thead>
            <tr>
              <th>{{$t('order_line.status.name')}}</th>
              <th>{{$t('order_line.product.name')}}</th>
              <th>{{$t('order_line.product_sell_price')}}</th>
              <th>{{$t('order_line.name')}}</th>
              <th>{{$t('order_line.vat.name')}}</th>
              <th>{{$t('order_line.price_sell_brutto')}}</th>
              <th width="60px;"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="line in lines" :key="line.id">

              <td>
                <v-select
                        id="order_line_status"
                        v-model="line.status"
                        :options="statuses"
                        :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>
                <div v-if="isInvalid('status')" class="invalid-feedback">{{ violations.status }}</div>
              </td>
              <td>
                <v-select
                        id="order_line_product"
                        v-model="line.product"
                        :options="products"
                        :class="['form-control-select2', isInvalid('product') ? 'is-invalid' : '']"
                        label="name"
                        @search="loadProducts"
                        @input="productSelected(line)"
                ></v-select>
                <div v-if="isInvalid('product')" class="invalid-feedback">{{ violations.product }}</div>
              </td>
              <td>
                <v-select
                        id="order_line_productSellPrice"
                        v-model="line.productSellPrice"
                        :options="line.productSellPrices"
                        :class="['form-control-select2', isInvalid('productSellPrice') ? 'is-invalid' : '']"
                        label="name"
                        @input="productSellPriceSelected(line)"
                ></v-select>
                <div v-if="isInvalid('productSellPrice')" class="invalid-feedback">{{ violations.productSellPrice }}</div>
              </td>
              <td>
                <input
                        id="order_line_name"
                        v-model="line.name"
                        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                        type="text">
                <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
              </td>
              <td>
                <v-select
                        id="order_line_vat"
                        v-model="line.vat"
                        :options="vats"
                        :class="['form-control-select2', isInvalid('vat') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>
                <div v-if="isInvalid('vat')" class="invalid-feedback">{{ violations.vat }}</div>
              </td>
              <td>
                <input
                        id="order_line_priceSellBrutto"
                        v-model.number="line.priceSellBrutto"
                        :class="['form-control', isInvalid('priceSellBrutto') ? 'is-invalid' : '']"
                        type="number"
                        step="0.01"
                >
                <div v-if="isInvalid('priceSellBrutto')" class="invalid-feedback">{{ violations.priceSellBrutto }}</div>
              </td>
              <td>
                <button class="btn btn-info" @click.prevent="removeLine(line)">
                  <span class="fa fa-remove" aria-hidden="true" />
                  <span class="sr-only">{{$t('delete')}}</span>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <item-edit-actions :item="item" :entity="'OrderHeader'" :path="'order_header'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions } from 'vuex'
import axios from '../../interceptor'

export default {
  components: {
    ItemEditActions
  },

  props: {
    handleSubmit: {
      type: Function,
      required: true
    },



    item: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },


  },

  computed: {
    item () {
      return this.initialValues || this.values
    },

    lines () {
      let lines = this.item.lines

      lines.forEach(line => {
        line.product = line.productSellPrice.product
      })

      return lines
    },

    violations () {
      return this.errors || {}
    },

    statuses () {
      return this.$store.getters['order_line_status/list/items'] || []
    },

    vats () {
      return this.$store.getters['vat/list/items'] || []
    },

    products () {
      return this.$store.getters['product/list/items'] || []
    },

    channels () {
      return this.$store.getters['channel/list/items'] || []
    },

    shipmentMethods () {
      return this.$store.getters['shipment_method/list/items'] || []
    },

    paymentTypes () {
      return this.$store.getters['payment_type/list/items'] || []
    },

    clients () {
      return this.$store.getters['client/list/items'] || []
    },

    isLoading () {
      return this.$store.getters['general/isLoading']
    },
  },

  // data: function () {
  //   return {
  //     productSelected: function () {},
  //     productSellPriceSelected: function () {}
  //   }
  // },

  // watch: {
  //   isLoading: function (value) {
  //     console.log(value)
  //
  //     if (value === false) {
  //       setTimeout(() => {
  //         this.productSelected = line => {
  //           axios.get(process.env.API_URL + line.product['@id'] + '/product_sell_prices').then((data) => {
  //             line.productSellPrices = data['data']['hydra:member'].filter(value => {
  //               return value.channel.id === this.item.channel.id
  //             })
  //           })
  //
  //           line.name = line.product.name
  //         }
  //
  //         this.productSellPriceSelected = line => {
  //           line.vat = line.productSellPrice.vat
  //           line.priceSellBrutto= line.productSellPrice.priceSellBrutto
  //         }
  //       }, 2000)
  //     }
  //   }
  // },

  created () {
    this.getStatuses()
    this.getVats()
    this.getChannels()
    this.getShipmentMethods()
    this.getPaymentTypes()
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    ...mapActions({
      getStatuses: 'order_line_status/list/default',
      getChannels: 'channel/list/default',
      getPaymentTypes: 'payment_type/list/default',
      getShipmentMethods: 'shipment_method/list/default',
      getVats: 'vat/list/default',
      getProducts: 'product/list/default',
      getClients: 'client/list/default',
    }),

    loadClients(keyword, loading) {
      loading(true);

      this.searchClients(loading, keyword, this);
    },

    searchClients: _.debounce((loading, keyword, vm) => {
      vm.getClients('/clients?name=' + keyword)
      loading(false);
    }, 350),

    loadProducts(keyword, loading) {
      loading(true);

      this.searchProducts(loading, keyword, this);
    },

    searchProducts: _.debounce((loading, keyword, vm) => {
      vm.getProducts('/products?name=' + keyword)
      loading(false);
    }, 350),

    productSelected (line) {
      axios.get(process.env.API_URL + line.product['@id'] + '/product_sell_prices').then((data) => {
        line.productSellPrices = data['data']['hydra:member'].filter(value => {
          return value.channel.id === this.item.channel.id
        })
      })

      line.name = line.product.name
    },

    productSellPriceSelected (line) {
      line.vat = line.productSellPrice.vat
      line.priceSellBrutto= line.productSellPrice.priceSellBrutto
    },

    addLine () {
      this.item.lines.push({uuid: Date.now()})
    },

    removeLine (line) {
      this.item.lines = this.item.lines.filter(function(el) {
        if (!line.id) {
          line.id = line.uuid
        }

        return line.id !== el.id;
      })
    },
  }
}
</script>
