<template>
  <is-main-template
    title="client_list"
    route-add="ClientCreate"
    entity="client"
  >
    <api-table
      entity="Client"
      route="clients"
      path="client"
      :filterable="filterable"
      :custom-filters="customFilters"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    >
      <template slot="filter__labels.id">
        <labels-filter />
      </template>
    </api-table>
  </is-main-template>
</template>

<script>
import ApiTable from '../../components/ApiTable'
import columnContacts from '../../table/ColumnContacts'
import columnLabels from '../../table/ColumnLabels'
import columnCreatedAt from '../../table/ColumnCreatedAt'
import columnUpdatedAt from '../../table/ColumnUpdatedAt'
import LabelsFilter from '../../components/filters/LabelsFilter'
import columnIsActive from '../../table/ColumnIsActive'

export default {
  components: { LabelsFilter, ApiTable },
  data() {
    return {
      columns: [
        'id',
        'name',
        'contacts.value',
        'description',
        'labels.id',
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
      customFilters: ['labels.id'],
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
        'labels.id': columnLabels,
        isActive: columnIsActive
      }
    }
  }
}
</script>
