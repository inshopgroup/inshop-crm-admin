<template>
<div>
  <section class="content-header">
    <h1>{{$t('payment_type.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'PaymentTypeCreate' }" class="btn btn-primary pull-right">{{$t('payment_type.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'payment_type'"></item-errors>

        <api-table
                :entity="'PaymentType'"
                :route="'payment_types'"
                :path="'payment_type'"
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
      columns: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
