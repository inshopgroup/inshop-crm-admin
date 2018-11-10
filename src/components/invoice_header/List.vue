<template>
<div>
  <section class="content-header">
    <h1>{{$t('invoice_header.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'InvoiceHeaderCreate' }" class="btn btn-primary pull-right">{{$t('invoice_header.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'invoice_header'"></item-list-errors>

        <api-table
                :entity="'InvoiceHeader'"
                :route="'invoice_headers'"
                :path="'invoice_header'"
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
import ItemListErrors from '../layout/errors/ItemListErrors'
import ApiTable from '../ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'

export default {
  components: {ItemListErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'number', 'status.name', 'type.name', 'companyFrom.name', 'companyTo.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'number', 'status.name', 'type.name', 'companyFrom.name', 'companyTo.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'number', 'status.name', 'type.name', 'companyFrom.name', 'companyTo.name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
