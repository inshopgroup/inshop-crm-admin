<template>
  <div>
    <section class="content-header">
      <h1>{{$t('user.list')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link :to="{ name: 'UserCreate' }" class="btn btn-primary pull-right">{{$t('user.add')}}</router-link>
        </div>
        <div class="box-body">
          <item-errors :entity="'user'"></item-errors>

          <api-table
            :entity="'User'"
            :route="'users'"
            :path="'user'"
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
import ItemErrors from '../layout/errors/ItemErrors'
import ApiTable from '../ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'
import columnGroups from './../../table/ColumnGroups'

export default {
  components: {ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'name', 'email', 'groups.name', 'language.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'email', 'groups.name', 'language.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'email', 'groups.name', 'language.name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        'groups.name': columnGroups
      }
    }
  },
}
</script>
