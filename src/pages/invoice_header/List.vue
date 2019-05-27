<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_header_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'InvoiceHeaderCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('invoice_header_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors entity="invoiceHeader" />
          <api-table
            entity="InvoiceHeader"
            route="invoice_headers"
            path="invoiceHeader"
            :filterable="filterable"
            :sortable="sortable"
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
  components: {ItemErrors, ApiTable},
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
  }
}
</script>
