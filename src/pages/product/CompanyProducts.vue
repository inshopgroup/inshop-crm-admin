<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{$t('id')}}</th>
        <th>{{$t('company_name')}}</th>
        <th>{{$t('currency_name')}}</th>
        <th>{{$t('price_buy_netto')}}</th>
        <th>{{$t('availability')}}</th>
        <th>{{$t('createdAt')}}</th>
        <th>{{$t('updatedAt')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="companyProduct in companyProducts" :key="companyProduct.id">
        <td>
          {{ companyProduct.id }}
        </td>
        <td>
          <router-link v-if="companyProduct" :to="{name: 'CompanyShow', params: { id: companyProduct['company'].id }}">
            {{ companyProduct['company']['name'] }}
          </router-link>
        </td>
        <td>
          {{ companyProduct['currency']['name'] }}
        </td>
        <td>
          {{ companyProduct['priceBuyNetto'] }}
        </td>
        <td>
          {{ companyProduct['availability'] }}
        </td>
        <td>
          {{ fecha.format(fecha.parse(item.createdAt, 'YYYY-MM-DDTHH:mm:ss'), 'DD-MM-YYYY HH:mm') }}
        </td>
        <td>
          {{ fecha.format(fecha.parse(item.updatedAt, 'YYYY-MM-DDTHH:mm:ss'), 'DD-MM-YYYY HH:mm') }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import fecha from 'fecha'

  export default {
    name: 'CompanyProducts',
    data () {
      return {
        fecha: fecha,
      }
    },
    props: {
      companyProducts: {
        type: Array,
        default: function () {
          return []
        }
      },
    }
  }
</script>
