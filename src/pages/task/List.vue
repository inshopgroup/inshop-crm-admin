<template>
  <is-main-template title="task_list" route-add="TaskCreate" entity="task">
    <api-table
      entity="Task"
      route="tasks"
      path="task"
      :filterable="filterable"
      :custom-filters="customFilters"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    >
      <template slot="filter__status.id">
        <task-status-filter />
      </template>
    </api-table>
  </is-main-template>
</template>

<script>
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from '../../table/ColumnCreatedAt'
import columnUpdatedAt from '../../table/ColumnUpdatedAt'
import columnDeadline from '../../table/ColumnDeadline'
import columnStatus from '../../table/ColumnStatus'
import TaskStatusFilter from '../../components/filters/TaskStatusFilter'
import columnIsActive from '../../table/ColumnIsActive'

export default {
  components: { TaskStatusFilter, ApiTable },
  data() {
    return {
      columns: [
        'id',
        'name',
        'status.id',
        'project.name',
        'assignee.name',
        'columnDeadline',
        'timeEstimated',
        'timeSpent',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'name',
        'project.name',
        'assignee.name',
        'columnDeadline',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      customFilters: ['status.id'],
      sortable: [
        'id',
        'name',
        'status.id',
        'project.name',
        'assignee.name',
        'columnDeadline',
        'timeEstimated',
        'timeSpent',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        columnDeadline,
        'status.id': columnStatus,
        isActive: columnIsActive
      }
    }
  }
}
</script>
