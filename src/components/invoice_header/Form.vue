<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('invoice_header.tabs.general')}}</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="invoice_header_number" class="form-control-label">{{$t('invoice_header.number')}}</label>
                <input
                        id="invoice_header_number"
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
                <label for="invoice_header_status" class="form-control-label">{{$t('invoice_header.status.name')}}</label>
                <v-select
                        id="invoice_header_status"
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
                <label for="invoice_header_companyFrom" class="form-control-label">{{$t('invoice_header.companyFrom.name')}}</label>

                <v-select
                        id="invoice_header_companyFrom"
                        v-model="item.companyFrom"
                        :options="companiesFrom"
                        :class="['form-control-select2', isInvalid('companyFrom') ? 'is-invalid' : '']"
                        label="name"
                        @search="loadCompaniesFrom"
                ></v-select>

                <div v-if="isInvalid('companyFrom')" class="invalid-feedback">{{ violations.companyFrom }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="invoice_header_companyTo" class="form-control-label">{{$t('invoice_header.companyTo.name')}}</label>

                <v-select
                        id="invoice_header_companyTo"
                        v-model="item.companyTo"
                        :options="companiesTo"
                        :class="['form-control-select2', isInvalid('companyTo') ? 'is-invalid' : '']"
                        label="name"
                        @search="loadCompaniesTo"
                ></v-select>

                <div v-if="isInvalid('companyTo')" class="invalid-feedback">{{ violations.companyTo }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">

              <div class="form-group">
                <label for="invoice_header_type" class="form-control-label">{{$t('invoice_header.type.name')}}</label>

                <v-select
                        id="invoice_header_type"
                        v-model="item.type"
                        :options="types"
                        :class="['form-control-select2', isInvalid('type') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>

                <div v-if="isInvalid('type')" class="invalid-feedback">{{ violations.type }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="invoice_header_currency" class="form-control-label">{{$t('invoice_header.currency.name')}}</label>

                <v-select
                        id="invoice_header_currency"
                        v-model="item.currency"
                        :options="currencies"
                        :class="['form-control-select2', isInvalid('currency') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>

                <div v-if="isInvalid('currency')" class="invalid-feedback">{{ violations.currency }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="invoice_header_agreement" class="form-control-label">{{$t('invoice_header.agreement.name')}}</label>

                <v-select
                        id="invoice_header_agreement"
                        v-model="item.agreement"
                        :options="agreements"
                        :class="['form-control-select2', isInvalid('agreement') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>

                <div v-if="isInvalid('agreement')" class="invalid-feedback">{{ violations.agreement }}</div>
              </div>
            </div>
            <div class="col-md-6">

              <div class="form-group">
                <label for="invoice_header_language" class="form-control-label">{{$t('invoice_header.language.name')}}</label>

                <v-select
                        id="invoice_header_language"
                        v-model="item.language"
                        :options="languages"
                        :class="['form-control-select2', isInvalid('language') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>

                <div v-if="isInvalid('language')" class="invalid-feedback">{{ violations.language }}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group" :class="[isInvalid('deadline') ? 'has-error' : '']">
                <label for="invoice_header_dateOfInvoice" class="form-control-label">{{$t('invoice_header.dateOfInvoice')}}</label>

                <datepicker
                        id="invoice_header_dateOfInvoice"
                        v-model="item.dateOfInvoice"
                        name="dateOfInvoice"
                        monday-first
                ></datepicker>

                <div v-if="isInvalid('dateOfInvoice')" class="invalid-feedback">{{ violations.dateOfInvoice }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="invoice_header_maturity" class="form-control-label">{{$t('invoice_header.maturity')}}</label>
                <input
                        id="invoice_header_maturity"
                        v-model="item.maturity"
                        :class="['form-control', isInvalid('maturity') ? 'is-invalid' : '']"
                        type="text"
                        placeholder=""
                        @input="handleUpdateField('maturity', $event.target.value)">
                <div v-if="isInvalid('maturity')" class="invalid-feedback">{{ violations.maturity }}</div>
              </div>
            </div>
          </div>

          <div class="row">
        <div class="col-md-6">
          <div class="form-group" :class="[isInvalid('deadline') ? 'has-error' : '']">
            <label for="invoice_header_dateOfSale" class="form-control-label">{{$t('invoice_header.dateOfSale')}}</label>

            <datepicker
                    id="invoice_header_dateOfSale"
                    v-model="item.dateOfSale"
                    name="dateOfSale"
                    monday-first
            ></datepicker>

            <div v-if="isInvalid('dateOfSale')" class="invalid-feedback">{{ violations.dateOfSale }}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="invoice_header_orderHeader" class="form-control-label">{{$t('invoice_header.orderHeader.number')}}</label>

            <v-select
                    id="invoice_header_orderHeader"
                    v-model="item.orderHeader"
                    :options="orderHeaders"
                    :class="['form-control-select2', isInvalid('orderHeader') ? 'is-invalid' : '']"
                    label="number"
                    @search="loadOrderHeaders"
            ></v-select>

            <div v-if="isInvalid('orderHeader')" class="invalid-feedback">{{ violations.orderHeader }}</div>
          </div>
        </div>
      </div>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('invoice_header.tabs.lines')}}</h3>
        </div>
        <div class="box-body">

          <button class="btn btn-info" @click.prevent="addLine()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{$t('invoice_line.add')}}</span>
          </button>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>{{$t('invoice_line.product.name')}}</th>
                <th>{{$t('invoice_line.name')}}</th>
                <th>{{$t('invoice_line.vat.name')}}</th>
                <th>{{$t('invoice_line.unitPriceNetto')}}</th>
                <th>{{$t('invoice_line.unitsCount')}}</th>
                <th width="60px;"></th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="line in item.lines" :key="line.id">

              <td>
                <v-select
                        id="invoice_line_product"
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
                <input
                        id="invoice_line_name"
                        v-model="line.name"
                        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                        type="text">
                <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
              </td>
              <td>
                <v-select
                        id="invoice_line_vat"
                        v-model="line.vat"
                        :options="vats"
                        :class="['form-control-select2', isInvalid('vat') ? 'is-invalid' : '']"
                        label="name"
                ></v-select>
                <div v-if="isInvalid('vat')" class="invalid-feedback">{{ violations.vat }}</div>
              </td>
              <td>
                <input
                        id="invoice_line_unitPriceNetto"
                        v-model.number="line.unitPriceNetto"
                        :class="['form-control', isInvalid('unitPriceNetto') ? 'is-invalid' : '']"
                        type="number"
                        step="0.01"
                >
                <div v-if="isInvalid('unitPriceNetto')" class="invalid-feedback">{{ violations.unitPriceNetto }}</div>
              </td>
              <td>
                <input
                        id="invoice_line_unitsCount"
                        v-model.number="line.unitsCount"
                        :class="['form-control', isInvalid('unitsCount') ? 'is-invalid' : '']"
                        type="number"
                        step="1"
                >
                <div v-if="isInvalid('unitsCount')" class="invalid-feedback">{{ violations.unitsCount }}</div>
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

    <item-edit-actions :item="item" :entity="'InvoiceHeader'" :path="'invoice_header'"></item-edit-actions>
  </form>
</template>

<script>
import ItemEditActions from '../layout/ItemEditActions'
import { mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker,
    ItemEditActions
  },

  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    handleUpdateField: {
      type: Function,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    item () {
      return this.initialValues
    },

    violations () {
      return this.errors || {}
    },

    statuses () {
      return this.$store.getters['invoice_status/list/items'] || []
    },

    types () {
      return this.$store.getters['invoice_type/list/items'] || []
    },

    languages () {
      return this.$store.getters['language/list/items'] || []
    },

    currencies () {
      return this.$store.getters['currency/list/items'] || []
    },

    vats () {
      return this.$store.getters['vat/list/items'] || []
    },

    products () {
      return this.$store.getters['product/list/items'] || []
    },

    orderHeaders () {
      return this.$store.getters['order_header/list/items'] || []
    },
    companiesFrom () {
      return this.$store.getters['company/list/items'] || []
    },
    companiesTo () {
      return this.$store.getters['company/list/items'] || []
    },
    agreements () {
      return this.item && this.item.companyFrom && this.item.companyFrom.documents || []
    }
  },

  created () {
    this.getStatuses()
    this.getTypes()
    this.getCurrencies()
    this.getLanguages()
    this.getVats()
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },

    ...mapActions({
      getStatuses: 'invoice_status/list/default',
      getTypes: 'invoice_type/list/default',
      getCurrencies: 'currency/list/default',
      getLanguages: 'language/list/default',
      getOrderHeaders: 'order_header/list/default',
      getCompanies: 'company/list/default',
      getProducts: 'product/list/default',
      getVats: 'vat/list/default',
    }),

    loadOrderHeaders (keyword, loading) {
      loading(true);

      this.searchOrderHeaders(loading, keyword, this);
    },

    searchOrderHeaders: _.debounce((loading, keyword, vm) => {
      vm.getOrderHeaders('/order_headers?number=' + keyword)
      loading(false);
    }, 350),

    loadCompaniesFrom (keyword, loading) {
      loading(true);

      this.searchCompaniesFrom(loading, keyword, this);
    },

    searchCompaniesFrom: _.debounce((loading, keyword, vm) => {
      vm.getCompanies('/companies?name=' + keyword)
      vm.item.agreement = null
      loading(false);
    }, 350),

    loadCompaniesTo (keyword, loading) {
      loading(true);

      this.searchCompaniesTo(loading, keyword, this);
    },

    searchCompaniesTo: _.debounce((loading, keyword, vm) => {
      vm.getCompanies('/companies?name=' + keyword)
      loading(false);
    }, 350),

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

    loadProducts (keyword, loading) {
      loading(true);

      this.searchProducts(loading, keyword, this);
    },

    searchProducts: _.debounce((loading, keyword, vm) => {
      vm.getProducts('/products?name=' + keyword)
      loading(false);
    }, 350),

    productSelected (line) {
      if (!line.name) {
        line.name = line.product.name
      }

      if (!line.vat) {
        line.vat = line.product.vat
      }

      if (!line.unitsCount) {
        line.unitsCount = 1
      }

      // TODO: add prices to product
      if (!line.unitPriceNetto) {
        // line.unitPriceNetto = line.product.price
      }
    }
  }
}
</script>
