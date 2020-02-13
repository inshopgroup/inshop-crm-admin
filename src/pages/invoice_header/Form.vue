<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors entity="invoiceHeader" />
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">
            {{ $t('tabs_general') }}
          </h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <form-input
                :item="item"
                :errors="errors"
                property="number"
                label="number"
                @formUpdated="updateValue"
              />
            </div>
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="status"
                option-store="invoiceStatus"
                label="status_name"
                @formUpdated="updateValue"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="companyFrom"
                option-store="company"
                label="companyFrom_name"
                @formUpdated="updateValue"
              />
            </div>
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="companyTo"
                option-store="company"
                label="companyTo_name"
                @formUpdated="updateValue"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="type"
                option-store="invoiceType"
                label="type_name"
                @formUpdated="updateValue"
              />
            </div>
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="currency"
                option-store="currency"
                label="currency_name"
                @formUpdated="updateValue"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="agreement"
                option-store="document"
                label="agreement_name"
                @formUpdated="updateValue"
              />
            </div>
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="language"
                option-store="language"
                label="language_name"
                @formUpdated="updateValue"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-date-picker
                :item="item"
                :errors="errors"
                property="dateOfInvoice"
                label="dateOfInvoice"
                @formUpdated="updateValue"
              />
            </div>
            <div class="col-md-6">
              <form-input
                :item="item"
                :errors="errors"
                property="maturity"
                label="maturity"
                @formUpdated="updateValue"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-date-picker
                :item="item"
                :errors="errors"
                property="dateOfSale"
                label="dateOfSale"
                @formUpdated="updateValue"
              />
            </div>
            <div class="col-md-6">
              <form-select
                :item="item"
                :errors="errors"
                property="orderHeader"
                option-store="orderHeader"
                label="orderHeader_number"
                @formUpdated="updateValue"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-checkbox
                :item="item"
                :errors="errors"
                property="isActive"
                label="isActive"
                @formUpdated="updateValue"
              />
            </div>
            <div class="col-md-6" />
          </div>
        </div>
      </div>
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">
            {{ $t('tabs_lines') }}
          </h3>
        </div>
        <div class="box-body">
          <button type="button" class="btn btn-info" @click.prevent="addLine()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{ $t('invoice_line_add') }}</span>
          </button>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>{{ $t('product_name') }}</th>
                <th>{{ $t('name') }}</th>
                <th>{{ $t('vat_name') }}</th>
                <th>{{ $t('unitPriceNetto') }}</th>
                <th>{{ $t('unitsCount') }}</th>
                <th width="60px;" />
              </tr>
            </thead>
            <tbody>
              <tr v-for="line in item.lines" :key="line.id">
                <td>
                  <form-select
                    :item="line"
                    :errors="errors"
                    property="product"
                    option-store="product"
                    label="product_name"
                    @formUpdated="updateValue"
                  />
                </td>
                <td>
                  <form-input
                    :item="line"
                    :errors="errors"
                    property="name"
                    label="name"
                    @formUpdated="updateValue"
                  />
                </td>
                <td>
                  <form-select
                    :item="line"
                    :errors="errors"
                    property="vat"
                    option-store="vat"
                    label="vat_name"
                    @formUpdated="updateValue"
                  />
                </td>
                <td>
                  <form-number
                    :item="line"
                    :errors="errors"
                    property="unitPriceNetto"
                    label="unitPriceNetto"
                    @formUpdated="updateValue"
                  />
                </td>
                <td>
                  <form-number
                    :item="line"
                    :errors="errors"
                    property="unitsCount"
                    label="unitsCount"
                    @formUpdated="updateValue"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-info"
                    @click.prevent="removeLine(line)"
                  >
                    <span class="fa fa-remove" aria-hidden="true" />
                    <span class="sr-only">{{ $t('delete') }}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <item-edit-actions
        :item="item"
        entity="InvoiceHeader"
        path="invoice_header"
      />
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
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
    }
  },
  computed: {
    ...mapGetters({
      errors: 'invoiceHeader/errors'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      reset: 'invoiceHeader/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('invoiceHeader/INVOICE_HEADER_UPDATE_ITEM', {
        [property]: value
      })
    },
    addLine() {
      this.item.lines.push({ uuid: Date.now() })
    },
    removeLine(line) {
      this.item.lines = this.item.lines.filter(el => {
        if (!line.id) {
          line.id = line.uuid
        }

        return line.id !== el.id
      })
    },
    productSelected(line) {
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
