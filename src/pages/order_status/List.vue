<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_status_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'OrderStatusCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('order_status_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors entity="orderStatus" />
          <api-table
            entity="OrderStatus"
            route="order_statuses"
            path="orderStatus"
            :filterable="filterable"
            :columns="columns"
            :templates="templates"
          />
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
