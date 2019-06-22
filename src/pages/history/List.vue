<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('history_list') }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-list-errors entity="history" />

          <api-table
            entity="History"
            route="histories"
            path="history"
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
import ItemListErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnLoggedAt from './../../table/ColumnLoggedAt'
import columnData from './../../table/ColumnData'

export default {
  components: { ItemListErrors, ApiTable },
  data: function() {
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
