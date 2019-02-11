<template>
<div>
  <section class="content-header">
    <h1>{{$t('invoice_type.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'InvoiceTypeCreate' }" class="btn btn-primary pull-right">{{$t('invoice_type.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'invoice_type'"></item-errors>

        <api-table
                :entity="'InvoiceType'"
                :route="'invoice_types'"
                :path="'invoice_type'"
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
import ItemErrors from '../layout/errors/ItemErrors'
import ApiTable from '../ApiTable'
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
