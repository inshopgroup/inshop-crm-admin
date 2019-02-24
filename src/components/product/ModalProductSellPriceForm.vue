<template>
<div class="modal fade" id="modal-product-sell-price-edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{modalEdit.title}}</h4>
      </div>
      <div class="modal-body form-horizontal">

        <div :class="[{ 'has-error': isInvalid('companyProduct') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('product_sell_price.company_product.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="product_sell_price_company_product"
                    v-model="modalEdit.item.companyProduct"
                    :options="companyProducts"
                    :class="['form-control-select2', isInvalid('companyProduct') ? 'is-invalid' : '']"
                    label="companyName"
            ></v-select>
            <span class="help-block">{{ violations.companyProduct }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('channel') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('product_sell_price.channel.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="product_sell_price_channel"
                    v-model="modalEdit.item.channel"
                    :options="channels"
                    :class="['form-control-select2', isInvalid('channel') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>
            <span class="help-block">{{ violations.channel }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('vat') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('product_sell_price.vat.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="product_sell_price_vat"
                    v-model="modalEdit.item.vat"
                    :options="vats"
                    :class="['form-control-select2', isInvalid('vat') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>
            <span class="help-block">{{ violations.vat }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('priceSellBrutto') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('product_sell_price.price_sell_brutto')}}:</label>
          <div class="col-sm-10">
            <input
                    id="product_sell_price_price_sell_brutto"
                    v-model.number="modalEdit.item.priceSellBrutto"
                    :class="['form-control', isInvalid('priceSellBrutto') ? 'is-invalid' : '']"
                    type="number"
                    placeholder="">
            <span class="help-block">{{ violations.priceSellBrutto }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('priceOldSellBrutto') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('product_sell_price.price_old_sell_brutto')}}:</label>
          <div class="col-sm-10">
            <input
                    id="product_sell_price_price_old_sell_brutto"
                    v-model.number="modalEdit.item.priceOldSellBrutto"
                    :class="['form-control', isInvalid('priceOldSellBrutto') ? 'is-invalid' : '']"
                    type="number"
                    placeholder="">
            <span class="help-block">{{ violations.priceOldSellBrutto }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('activeFrom') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('product_sell_price.active_from')}}:</label>
          <div :class="[isInvalid('activeFrom') ? 'has-error col-sm-10' : 'col-sm-10']">
            <datepicker
                    id="product_sell_price_active_from"
                    v-model="modalEdit.item.activeFrom"
                    name="activeFrom"
                    monday-first
            ></datepicker>

            <span class="help-block">{{ violations.activeFrom }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('activeTo') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('product_sell_price.active_to')}}:</label>
          <div :class="[isInvalid('activeTo') ? 'has-error col-sm-10' : 'col-sm-10']">
            <datepicker
                    id="product_sell_price_active_to"
                    v-model="modalEdit.item.activeTo"
                    name="activeTo"
                    monday-first
            ></datepicker>

            <span class="help-block">{{ violations.activeTo }}</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{$t('close')}}</button>
        <button type="submit" class="btn btn-primary" @click="save(modalEdit.item)">{{$t('save')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '../../interceptor'
import { mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker';

export default {
  components: {Datepicker},
  name: 'ModalProductSellPriceForm',
  data () {
    return {
      errors: {},
    }
  },

  props: {
    modalEdit: {
      title: '',
      item: {},
    },
  },

  computed: {
    violations () {
      return this.errors || {}
    },
    vats () {
      return this.$store.getters['vat/list/items'] || []
    },
    channels () {
      return this.$store.getters['channel/list/items'] || []
    },
    companyProducts () {
      let companyProducts = this.$store.getters['product/show/companyProducts'] || []

      companyProducts.forEach(companyProduct => {
        companyProduct.companyName = companyProduct.company.name
      })

      return companyProducts
    },
  },

  mounted () {
    this.getChannels()
    // this.loadCompanyProducts()
    this.getVats()
  },

  methods: {
    ...mapActions({
      getChannels: 'channel/list/default',
      // getCompanyProducts: 'product/show/getCompanyProducts',
      getVats: 'vat/list/default'
    }),

    // loadCompanyProducts () {
    //   this.getCompanyProducts(this.$route.params.id)
    // },

    save (item) {
      axios.request({
        url: this.modalEdit.url,
        method: this.modalEdit.method,
        data: item
      })
        .then(response => {
          this.$toastr.s(this.$t('product_sell_price.saved', {product_sell_price: item.value}), this.$t('saved'))
          $('#modal-product-sell-price-edit').modal('hide')
          this.$emit('productSellPriceCreated', item)
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            let data = e.response.data

            if (data.violations) {
              const errors = {}

              data.violations.map(violation => {
                Object.assign(errors, { [violation.propertyPath]: violation.message })
              })

              this.errors = errors
            } else {
              this.$toastr.e(data['hydra:description'], data['hydra:title']);
            }
          } else {
            this.$toastr.e(e.message, this.$t('error_occurred'))
          }
        })
    },

    updateValue(property, value) {
this.$store.commit('address/ADDRESS_UPDATE_ITEM', {[property]: value})
},
  }
}
</script>
