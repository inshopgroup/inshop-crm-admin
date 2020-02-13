<template>
  <is-main-template title="vat_list" route-add="VatCreate" entity="vat">
    <api-table
      entity="Vat"
      route="vats"
      path="vat"
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
        'name',
        'value',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'name',
        'value',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'name',
        'value',
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
