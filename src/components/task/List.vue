<template>
<div>
  <section class="content-header">
    <h1>{{$t('task.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'TaskCreate' }" class="btn btn-primary pull-right">{{$t('task.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'task'"></item-errors>

        <api-table
                :entity="'Task'"
                :route="'tasks'"
                :path="'task'"
                :filterable="filterable"
                :customFilters="customFilters"
                :sortable="sortable"
                :columns="columns"
                :templates="templates"
        >
          <template slot="filter__status.id">
            <task-status-filter></task-status-filter>
          </template>
        </api-table>
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
import columnDeadline from './../../table/ColumnDeadline'
import columnStatus from './../../table/ColumnStatus'
import TaskStatusFilter from '../filters/TaskStatusFilter'

export default {
  components: {TaskStatusFilter, ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'name', 'status.id', 'project.name', 'assignee.name', 'columnDeadline', 'timeEstimated', 'timeSpent', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'project.name', 'assignee.name', 'columnDeadline', 'columnCreatedAt', 'columnUpdatedAt'],
      customFilters: ['status.id'],
      sortable: ['id', 'name', 'status.id', 'project.name', 'assignee.name', 'columnDeadline', 'timeEstimated', 'timeSpent', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        columnDeadline,
        'status.id': columnStatus
      }
    }
  }
}
</script>
