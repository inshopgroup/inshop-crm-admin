<template>
  <div class="table-responsive">
    <button class="btn btn-primary" @click="create($event.target)">{{$t('product_sell_price.add')}}</button>

    <br>
    <br>

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{$t('product_sell_price.id')}}</th>
        <th>{{$t('product_sell_price.company_product.name')}}</th>
        <th>{{$t('product_sell_price.channel.name')}}</th>
        <th>{{$t('product_sell_price.currency.name')}}</th>
        <th>{{$t('product_sell_price.vat.name')}}</th>
        <th>{{$t('product_sell_price.price_sell_brutto')}}</th>
        <th>{{$t('product_sell_price.price_old_sell_brutto')}}</th>
        <th>{{$t('product_sell_price.active_from')}}</th>
        <th>{{$t('product_sell_price.active_to')}}</th>
        <th>{{$t('product_sell_price.createdAt')}}</th>
        <th>{{$t('product_sell_price.updatedAt')}}</th>
        <th style="width: 100px;" />
      </tr>
      </thead>
      <tbody>
      <tr v-for="productSellPrice in productSellPrices" :key="productSellPrice.id">
        <td>{{ productSellPrice.id }}</td>
        <td>{{ productSellPrice['companyProduct']['company']['name'] }}</td>
        <td>{{ productSellPrice['channel']['name'] }}</td>
        <td>{{ productSellPrice['channel']['currency']['name'] }}</td>
        <td>{{ productSellPrice['vat']['name'] }}</td>
        <td>{{ productSellPrice['priceSellBrutto'] }}</td>
        <td>{{ productSellPrice['priceOldSellBrutto'] }}</td>
        <td>{{ moment(productSellPrice['activeFrom']).format('DD-MM-YYYY HH:mm') }}</td>
        <td>{{ moment(productSellPrice['activeTo']).format('DD-MM-YYYY HH:mm') }}</td>
        <td>{{ moment(productSellPrice['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
        <td>{{ moment(productSellPrice['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-info" @click="edit(productSellPrice, $event.target)">
              <span class="fa fa-pencil" aria-hidden="true" />
              <span class="sr-only">{{$t('edit')}}</span>
            </button>

            <button class="btn btn-info" @click="deleteItem(productSellPrice)">
              <span class="fa fa-remove" aria-hidden="true" />
              <span class="sr-only">{{$t('delete')}}</span>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <modal-product-sell-price-form
      :modal-edit="modalEdit"
      @productSellPriceCreated="reloadProductSellPrices()"
    ></modal-product-sell-price-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ModalProductSellPriceForm from './ModalProductSellPriceForm'

  export default {
    name: 'ProductSellPrices',
    components: {ModalProductSellPriceForm},
    props: {
      company: null,
      product: null,
      productSellPrices: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    data () {
      return {
        modalEdit: {
          title: null,
          item: {},
          url: null,
          method: null
        }
      }
    },
    methods: {
      ...mapActions({
        del: 'product_sell_price/del/del',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.del(item).then(() => {
            this.$toastr.s(this.$t('product_sell_price.deleted', {product_sell_price: item.name}), this.$t('deleted'))
            this.reloadProductSellPrices()
          })
        }
      },
      create (button) {
        this.modalEdit = {
          title: this.$t('product_sell_price.add'),
          item: {
            product: this.product,
          },
          url: process.env.API_URL + '/product_sell_prices',
          method: 'post'
        }

        $('#modal-product-sell-price-edit').modal('show')
      },
      edit (item, button) {
        this.modalEdit = {
          title: this.$t('product_sell_price.edit', {product_sell_price: item.name}),
          item: Object.assign({}, item),
          url: process.env.API_URL + item.id,
          method: 'put'
        }

        $('#modal-product-sell-price-edit').modal('show')
      },
      reloadProductSellPrices () {
        this.$emit('reloadProductSellPrices')
      }
    }
  }
</script>
