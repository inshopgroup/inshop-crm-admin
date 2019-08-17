<template>
  <is-main-template title="backup_list">
    <api-table
      entity="Backup"
      route="backups"
      path="backup"
      :filterable="filterable"
      :custom-filters="customFilters"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    >
      <template slot="filter__status.id">
        <backup-status-filter />
      </template>
      <template slot="filter__type.id">
        <backup-type-filter />
      </template>
    </api-table>
  </is-main-template>
</template>

<script>
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'
import columnDeadline from './../../table/ColumnDeadline'
import columnStatus from './../../table/ColumnStatus'
import columnType from './../../table/ColumnType'
import BackupStatusFilter from '../../components/filters/BackupStatusFilter'
import BackupTypeFilter from '../../components/filters/BackupTypeFilter'
import columnIsActive from './../../table/ColumnIsActive'

export default {
  components: {
    BackupStatusFilter,
    BackupTypeFilter,
    ApiTable
  },
  data: function() {
    return {
      columns: [
        'id',
        'type.id',
        'name',
        'size',
        'status.id',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'name',
        'size',
        'columnDeadline',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      customFilters: ['type.id', 'status.id'],
      sortable: [
        'type.id',
        'id',
        'name',
        'size',
        'status.id',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        columnDeadline,
        'status.id': columnStatus,
        'type.id': columnType,
        isActive: columnIsActive
      }
    }
  }
}
</script>
