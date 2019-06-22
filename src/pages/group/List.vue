<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('group_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'GroupCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('group_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors entity="group" />
          <api-table
            entity="Group"
            route="groups"
            path="group"
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
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'
import columnGroups from './../../table/ColumnGroups'
import columnIsActive from './../../table/ColumnIsActive'

export default {
  components: { ItemErrors, ApiTable },
  data: function () {
    return {
      columns: ['id', 'name', 'isActive', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'isActive', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'isActive', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        'groups.name': columnGroups,
        'isActive': columnIsActive
      }
    }
  }
}
</script>
