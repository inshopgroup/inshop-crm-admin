<template>
<div>
  <section class="content-header">
    <h1>{{$t('order_header_list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'OrderHeaderCreate' }" class="btn btn-primary pull-right">{{$t('order_header_add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'order_header'"></item-errors>

        <api-table
                :entity="'OrderHeader'"
                :route="'order_headers'"
                :path="'order_header'"
                :filterable="filterable"
                :sortable="sortable"
                :columns="columns"
                :templates="templates"
        ></api-table>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'

export default {
  components: {ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'number', 'client.name', 'status.name', 'channel.name', 'channel.currency.name', 'paymentType.name', 'shipmentMethod.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'number', 'client.name', 'status.name', 'channel.name', 'channel.currency.name', 'paymentType.name', 'shipmentMethod.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'number', 'client.name', 'status.name', 'channel.name', 'channel.currency.name', 'paymentType.name', 'shipmentMethod.name','columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
