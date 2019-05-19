<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'order_header'"></item-errors>
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{ $t('tabs_general') }}</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <form-input :item="item" :errors="errors" :property="'number'" label="number" @formUpdated="updateValue"></form-input>
            </div>
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'status'" :option-store="'orderHeaderStatus'" label="status_name" @formUpdated="updateValue"></form-select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'channel'" :option-store="'channel'" label="channel_name" @formUpdated="updateValue"></form-select>
            </div>
            <div class="col-md-6">
              <form-select-autocomplete :item="item" :errors="errors" :property="'client'" :option-store="'channel'" label="client_name" @formUpdated="updateValue"></form-select-autocomplete>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'paymentType'" :option-store="'paymentType'" label="paymentType_name" @formUpdated="updateValue"></form-select>
            </div>
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'shipmentMethod'" :option-store="'shipmentMethod'" label="shipmentMethod_name" @formUpdated="updateValue"></form-select>
            </div>
          </div>
        </div>
      </div>
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{ $t('tabs_lines') }}</h3>
        </div>
        <div class="box-body">
          <button type="button" class="btn btn-info" @click.prevent="addLine()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{ $t('order_line_add') }}</span>
          </button>
          <table class="table table-striped">
            <thead>
            <tr>
              <th>{{ $t('status_name') }}</th>
              <th>{{ $t('product_name') }}</th>
              <th>{{ $t('product_sell_price') }}</th>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('vat_name') }}</th>
              <th>{{ $t('price_sell_brutto') }}</th>
              <th width="60px;"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="line in lines" :key="line.id">
              <td>
                <form-select :item="line" :errors="errors" :property="'status'" :option-store="'orderLineStatus'" label="status_name" @formUpdated="updateValue"></form-select>
              </td>
              <td>
                <form-select :item="line" :errors="errors" :property="'product'" :option-store="'product'" label="product_name" @formUpdated="updateValue" @input="productSelected(line)"></form-select>
              </td>
              <td>
                <form-select :item="line" :errors="errors" :property="'productSellPrice'" :option-store="'product_sell_price'" label="productSellPrice_name" @formUpdated="updateValue" @input="productSelected(line)"></form-select>
              </td>
              <td>
                <form-input :item="line" :errors="errors" :property="'name'" label="name" @formUpdated="updateValue"></form-input>
              </td>
              <td>
                <form-select :item="line" :errors="errors" :property="'vat'" :option-store="'vat'" label="vat_name" @formUpdated="updateValue" @input="productSelected(line)"></form-select>
              </td>
              <td>
                <form-number :item="line" :errors="errors" :property="'priceSellBrutto'" label="priceSellBrutto" @formUpdated="updateValue"></form-number>
              </td>
              <td>
                <button type="button" class="btn btn-info" @click.prevent="removeLine(line)">
                  <span class="fa fa-remove" aria-hidden="true" />
                  <span class="sr-only">{{$t('delete')}}</span>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <item-edit-actions :item="item" :entity="'OrderHeader'" :path="'order_header'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../../components/layout/ItemEditActions'
import axios from '../../interceptor'
import ItemErrors from "../../components/layout/errors/ItemErrors"

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
  beforeDestroy () {
    this.reset()
  },
  computed: {
    ...mapGetters({
      errors: 'order_header/errors'
    }),
    lines () {
      let lines = this.item.lines

      lines.forEach(line => {
        line.product = line.productSellPrice.product
      })

      return lines
    },
    isLoading () {
      return this.$store.getters['general/isLoading']
    },
  },
  methods: {
    ...mapActions({
      reset: 'order_header/reset'
    }),
    updateValue(property, value) {
      this.$store.commit('order_header/ORDER_HEADER_UPDATE_ITEM', {[property]: value})
    },
    productSelected (line) {
      axios.get(process.env.VUE_APP_API_URL + line.product.id + '/product_sell_prices').then((data) => {
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

        return line.id !== el.id
      })
    }
  }
}
</script>
