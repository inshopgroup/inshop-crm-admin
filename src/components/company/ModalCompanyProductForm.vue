<template>
<div class="modal fade" id="modal-company-product-edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{modalEdit.title}}</h4>
      </div>
      <div class="modal-body form-horizontal">

        <div :class="[{ 'has-error': isInvalid('company') }, 'form-group']" v-if="enableCompany">
          <label class="col-sm-2 control-label">{{$t('company_product.company.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="address_company"
                    v-model="modalEdit.item.company"
                    :options="companies"
                    :class="['form-control-select2', isInvalid('company') ? 'is-invalid' : '']"
                    label="name"
                    @search="loadCompanies"
            ></v-select>
            <span class="help-block">{{ violations.company }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('product') }, 'form-group']" v-if="enableProduct">
          <label class="col-sm-2 control-label">{{$t('company_product.product.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="address_product"
                    v-model="modalEdit.item.product"
                    :options="products"
                    :class="['form-control-select2', isInvalid('product') ? 'is-invalid' : '']"
                    label="name"
                    @search="loadProducts"
            ></v-select>
            <span class="help-block">{{ violations.product }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('currency') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('company_product.currency.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="address_country"
                    v-model="modalEdit.item.currency"
                    :options="currencies"
                    :class="['form-control-select2', isInvalid('currency') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>
            <span class="help-block">{{ violations.currency }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('priceBuyNetto') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('company_product.price_buy_netto')}}:</label>
          <div class="col-sm-10">
            <input
                    id="company_product_price_buy_netto"
                    v-model.number="modalEdit.item.priceBuyNetto"
                    :class="['form-control', isInvalid('priceBuyNetto') ? 'is-invalid' : '']"
                    type="number"
                    placeholder="">
            <span class="help-block">{{ violations.priceBuyNetto }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('availability') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('company_product.availability')}}:</label>
          <div class="col-sm-10">
            <input
                    id="company_product_availability"
                    v-model.number="modalEdit.item.availability"
                    :class="['form-control', isInvalid('availability') ? 'is-invalid' : '']"
                    type="number"
                    placeholder="">
            <span class="help-block">{{ violations.availability }}</span>
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

export default {
  components: {},
  name: 'ModalCompanyProductForm',
  data () {
    return {
      errors: {},
    }
  },

  props: {
    enableCompany: true,
    enableProduct: true,
    modalEdit: {
      title: '',
      item: {},
    },
  },

  computed: {
    violations () {
      return this.errors || {}
    },
    currencies () {
      return this.$store.getters['currency/list/items'] || []
    },
    companies () {
      return this.$store.getters['company/list/items'] || []
    },
    products () {
      return this.$store.getters['product/list/items'] || []
    },
  },

  mounted () {
    this.getCurrencies()
  },

  methods: {
    ...mapActions({
      getCurrencies: 'currency/list/default',
      getCompanies: 'company/list/default',
      getProducts: 'product/list/default'
    }),

    save (item) {
      axios.request({
        url: this.modalEdit.url,
        method: this.modalEdit.method,
        data: item
      })
        .then(response => {
          this.$toastr.s(this.$t('company_product.saved', {document: item.value}), this.$t('saved'))
          $('#modal-company-product-edit').modal('hide')
          this.$emit('companyProductCreated', item)
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

    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    loadCompanies (keyword, loading) {
      loading(true);

      this.searchCompanies(loading, keyword, this);
    },

    searchCompanies: _.debounce((loading, keyword, vm) => {
      vm.getCompanies('/companies?name=' + keyword)
      loading(false);
    }, 350),

    loadProducts (keyword, loading) {
      loading(true);

      this.searchProducts(loading, keyword, this);
    },

    searchProducts: _.debounce((loading, keyword, vm) => {
      vm.getProducts('/products?name=' + keyword)
      loading(false);
    }, 350)
  }
}
</script>

<style>
.dz-preview {
  width: 150px;
  height: 150px;
}
</style>
