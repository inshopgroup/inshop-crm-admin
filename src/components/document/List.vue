<template>
<div>
  <section class="content-header">
    <h1>{{$t('document.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'DocumentCreate' }" class="btn btn-primary pull-right">{{$t('document.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'document'"></item-list-errors>

        <api-table
                :entity="'Document'"
                :route="'documents'"
                :path="'document'"
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
      columns: ['id', 'name', 'client.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'client.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'client.name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
