<template>
  <is-main-template
    title="invoice_header_list"
    route-add="InvoiceHeaderCreate"
    entity="invoiceHeader"
  >
    <api-table
      entity="InvoiceHeader"
      route="invoice_headers"
      path="invoice_header"
      :filterable="filterable"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    />
  </is-main-template>
</template>

<script>
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from '../../table/ColumnCreatedAt'
import columnUpdatedAt from '../../table/ColumnUpdatedAt'
import columnIsActive from '../../table/ColumnIsActive'

export default {
  components: { ApiTable },
  data() {
    return {
      columns: [
        'id',
        'number',
        'status.name',
        'type.name',
        'companyFrom.name',
        'companyTo.name',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'number',
        'status.name',
        'type.name',
        'companyFrom.name',
        'companyTo.name',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'number',
        'status.name',
        'type.name',
        'companyFrom.name',
        'companyTo.name',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        isActive: columnIsActive
      }
    }
  }
}
</script>
