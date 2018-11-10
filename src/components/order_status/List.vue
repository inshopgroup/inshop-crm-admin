<template>
<div>
  <section class="content-header">
    <h1>{{$t('order_status.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'OrderStatusCreate' }" class="btn btn-primary pull-right">{{$t('order_status.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'order_status'"></item-list-errors>

        <api-table
                :entity="'OrderStatus'"
                :route="'order_statuses'"
                :path="'order_status'"
                :filterable="filterable"
                :columns="columns"
                :templates="templates"
        ></api-table>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import ItemListErrors from '../layout/errors/ItemListErrors'
import ApiTable from '../ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'

export default {
  components: {ItemListErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
