<template>
  <div>
    <section class="content-header">
      <h1>{{$t('group.list')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link :to="{ name: 'GroupCreate' }" class="btn btn-primary pull-right">{{$t('group.add')}}</router-link>
        </div>
        <div class="box-body">
          <item-list-errors :entity="'group'"></item-list-errors>

          <api-table
            :entity="'Group'"
            :route="'groups'"
            :path="'group'"
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
import columnGroups from './../../table/ColumnGroups'

export default {
  components: {ItemListErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        'groups.name': columnGroups
      }
    }
  },
}
</script>
