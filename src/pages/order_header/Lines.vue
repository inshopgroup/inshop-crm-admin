<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{ $t('id') }}</th>
        <th>{{ $t('status_name') }}</th>
        <th>{{ $t('product_name') }}</th>
        <th>{{ $t('vat_name') }}</th>
        <th>{{ $t('price_sell_brutto') }}</th>
        <th>{{ $t('createdAt') }}</th>
        <th>{{ $t('updatedAt') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="line in lines" :key="line.id">
        <td>
          {{ line.id }}
        </td>
        <td>
          <router-link v-if="line['status']" :to="{name: 'OrderLineStatusShow', params: { id: line['status'].id }}">
            {{ line['status']['name'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="line['productSellPrice'] && line['productSellPrice']['product']" :to="{name: 'ProductShow', params: { id: line['productSellPrice']['product'].id }}">
            {{ line['productSellPrice']['product']['name'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="line['vat']" :to="{name: 'VatShow', params: { id: line['vat'].id }}">
            {{ line['vat']['name'] }}
          </router-link>
        </td>
        <td>
          {{line.priceSellBrutto}}
        </td>
        <td>
          {{ dateFormat(item.createdAt) }}
        </td>
        <td>
          {{ dateFormat(item.updatedAt) }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Lines',
  props: {
    lines: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
