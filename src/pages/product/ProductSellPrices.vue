<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">
            {{ $t('id') }}
          </th>
          <th>{{ $t('company_product_name') }}</th>
          <th>{{ $t('channel_name') }}</th>
          <th>{{ $t('currency_name') }}</th>
          <th>{{ $t('vat_name') }}</th>
          <th>{{ $t('price_sell_brutto') }}</th>
          <th>{{ $t('price_old_sell_brutto') }}</th>
          <th>{{ $t('active_from') }}</th>
          <th>{{ $t('active_to') }}</th>
          <th>{{ $t('createdAt') }}</th>
          <th>{{ $t('updatedAt') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="productSellPrice in productSellPrices"
          :key="productSellPrice.id"
        >
          <td>{{ productSellPrice.id }}</td>
          <td>{{ productSellPrice['companyProduct']['company']['name'] }}</td>
          <td>{{ productSellPrice['channel']['name'] }}</td>
          <td>{{ productSellPrice['channel']['currency']['name'] }}</td>
          <td>{{ productSellPrice['vat']['name'] }}</td>
          <td>{{ productSellPrice['priceSellBrutto'] }}</td>
          <td>{{ productSellPrice['priceOldSellBrutto'] }}</td>
          <td>{{ dateFormat(productSellPrice['activeFrom']) }}</td>
          <td>{{ dateFormat(productSellPrice['activeTo']) }}</td>
          <td>{{ dateFormat(productSellPrice['createdAt']) }}</td>
          <td>{{ dateFormat(productSellPrice['updatedAt']) }}</td>
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
    }
  }
}
</script>
