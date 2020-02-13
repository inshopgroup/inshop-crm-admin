<template>
  <is-main-template
    title="project_list"
    route-add="ProjectCreate"
    entity="project"
  >
    <api-table
      entity="Project"
      route="projects"
      path="project"
      :filterable="filterable"
      :custom-filters="customFilters"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    >
      <template slot="filter__status.id">
        <project-status-filter />
      </template>

      <template slot="filter__type.id">
        <project-type-filter />
      </template>
    </api-table>
  </is-main-template>
</template>

<script>
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from '../../table/ColumnCreatedAt'
import columnUpdatedAt from '../../table/ColumnUpdatedAt'
import columnStatus from '../../table/ColumnStatus'
import columnType from '../../table/ColumnType'
import ProjectStatusFilter from '../../components/filters/ProjectStatusFilter'
import ProjectTypeFilter from '../../components/filters/ProjectTypeFilter'
import columnIsActive from '../../table/ColumnIsActive'

export default {
  components: { ProjectTypeFilter, ProjectStatusFilter, ApiTable },
  data() {
    return {
      columns: [
        'id',
        'name',
        'client.name',
        'status.id',
        'type.id',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'name',
        'client.name',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      customFilters: ['status.id', 'type.id'],
      sortable: [
        'id',
        'name',
        'client.name',
        'status.id',
        'type.id',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        'status.id': columnStatus,
        'type.id': columnType,
        isActive: columnIsActive
      }
    }
  }
}
</script>
