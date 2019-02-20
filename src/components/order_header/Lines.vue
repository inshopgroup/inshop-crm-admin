<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{$t('order_line.id')}}</th>
        <th>{{$t('order_line.status.name')}}</th>
        <th>{{$t('order_line.product.name')}}</th>
        <th>{{$t('order_line.vat.name')}}</th>
        <th>{{$t('order_line.price_sell_brutto')}}</th>
        <th>{{$t('order_line.createdAt')}}</th>
        <th>{{$t('order_line.updatedAt')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="line in lines" :key="line.id">
        <td>
          {{line.id}}
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
          {{ moment(line['createdAt']).format('DD-MM-YYYY HH:mm') }}
        </td>
        <td>
          {{ moment(line['updatedAt']).format('DD-MM-YYYY HH:mm') }}
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
