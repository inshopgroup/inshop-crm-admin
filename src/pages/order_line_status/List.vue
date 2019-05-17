<template>
<div>
  <section class="content-header">
    <h1>{{ $t('order_line_status_list') }}</h1>
  </section>
  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'OrderLineStatusCreate' }" class="btn btn-primary pull-right">{{ $t('order_line_status_add') }}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'order_line_status'"></item-errors>
        <api-table
          :entity="'OrderLineStatus'"
          :route="'order_line_statuses'"
          :path="'order_line_status'"
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
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'

export default {
  components: { ItemErrors, ApiTable },
  data: function () {
    return {
      columns: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  }
}
</script>
