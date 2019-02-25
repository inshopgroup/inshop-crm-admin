<template>
  <div class="table-responsive">
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
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ProductSellPrices',
    props: {
      productSellPrices: {
        type: Array,
        default: function () {
          return []
        }
      },
    }
  }
</script>
