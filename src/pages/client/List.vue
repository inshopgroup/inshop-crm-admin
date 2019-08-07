<template>
  <is-main-template title="client_list" route-add="ClientCreate" entity="client">
    <api-table
      entity="Client"
      route="clients"
      path="client"
      :filterable="filterable"
      :columns="columns"
      :templates="templates"
      :sortable="sortable"
    />
  </is-main-template>
</template>

<script>
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnContacts from './../../table/ColumnContacts'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'
import columnIsActive from './../../table/ColumnIsActive'

export default {
  components: { ItemErrors, ApiTable },
  data: function() {
    return {
      columns: [
        'id',
        'name',
        'contacts.value',
        'description',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'name',
        'contacts.value',
        'description',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'name',
        'description',
        'columnCreatedAt',
        'isActive',
        'columnUpdatedAt'
      ],
      templates: {
        'contacts.value': columnContacts,
        columnCreatedAt,
        columnUpdatedAt,
        isActive: columnIsActive
      }
    }
  }
}
</script>
