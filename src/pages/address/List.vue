<template>
  <is-main-template title="address_list" route-add="AddressCreate">
    <api-table
      entity="Address"
      route="addresses"
      path="address"
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
        'postCode',
        'country.name',
        'city',
        'region',
        'district',
        'street',
        'building',
        'apartment',
        'comment',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'postCode',
        'country.name',
        'city',
        'region',
        'district',
        'street',
        'building',
        'apartment',
        'comment',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'postCode',
        'country.name',
        'city',
        'region',
        'district',
        'street',
        'building',
        'apartment',
        'comment',
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
