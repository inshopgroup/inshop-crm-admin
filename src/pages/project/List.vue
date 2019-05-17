<template>
<div>
  <section class="content-header">
    <h1>{{ $t('project_list') }}</h1>
  </section>
  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'ProjectCreate' }" class="btn btn-primary pull-right">{{ $t('project_add') }}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'project'"></item-errors>
        <api-table
          :entity="'Project'"
          :route="'projects'"
          :path="'project'"
          :filterable="filterable"
          :customFilters="customFilters"
          :sortable="sortable"
          :columns="columns"
          :templates="templates"
        >
          <template slot="filter__status.id">
            <project-status-filter></project-status-filter>
          </template>

          <template slot="filter__type.id">
            <project-type-filter></project-type-filter>
          </template>
        </api-table>
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
import columnStatus from './../../table/ColumnStatus'
import columnType from './../../table/ColumnType'
import ProjectStatusFilter from '../../components/filters/ProjectStatusFilter'
import ProjectTypeFilter from '../../components/filters/ProjectTypeFilter'

export default {
  components: { ProjectTypeFilter, ProjectStatusFilter, ItemErrors, ApiTable },
  data: function () {
    return {
      columns: ['id', 'name', 'client.name', 'status.id', 'type.id', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'client.name', 'columnCreatedAt', 'columnUpdatedAt'],
      customFilters: ['status.id', 'type.id'],
      sortable: ['id', 'name', 'client.name', 'status.id', 'type.id', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        'status.id': columnStatus,
        'type.id': columnType
      }
    }
  }
}
</script>
