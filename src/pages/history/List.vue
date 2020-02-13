<template>
  <is-main-template title="history_list" entity="history">
    <api-table
      entity="History"
      route="histories"
      path="history"
      :filterable="filterable"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    />
  </is-main-template>
</template>

<script>
import ApiTable from '../../components/ApiTable'
import columnLoggedAt from '../../table/ColumnLoggedAt'
import columnData from '../../table/ColumnData'

export default {
  components: { ApiTable },
  data() {
    return {
      columns: [
        'username',
        'action',
        'columnLoggedAt',
        'objectClass',
        'objectId',
        'columnData'
      ],
      filterable: [
        'username',
        'action',
        'columnLoggedAt',
        'objectId',
        'objectClass'
      ],
      sortable: [
        'username',
        'action',
        'columnLoggedAt',
        'objectId',
        'objectClass'
      ],
      templates: {
        columnLoggedAt,
        columnData
      }
    }
  }
}
</script>
