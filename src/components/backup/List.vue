<template>
<div>
  <section class="content-header">
    <h1>{{$t('backup.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <!--<div class="box-header with-border">-->
        <!--<router-link :to="{ name: 'BackupCreate' }" class="btn btn-primary pull-right">{{$t('backup.add')}}</router-link>-->
      <!--</div>-->
      <div class="box-body">
        <item-list-errors :entity="'backup'"></item-list-errors>

        <api-table
                :entity="'Backup'"
                :route="'backups'"
                :path="'backup'"
                :filterable="filterable"
                :customFilters="customFilters"
                :sortable="sortable"
                :columns="columns"
                :templates="templates"
        >
          <template slot="filter__status.id">
            <backup-status-filter></backup-status-filter>
          </template>

          <template slot="filter__type.id">
            <backup-type-filter></backup-type-filter>
          </template>
        </api-table>
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
import columnDeadline from './../../table/ColumnDeadline'
import columnStatus from './../../table/ColumnStatus'
import columnType from './../../table/ColumnType'
import BackupStatusFilter from '../filters/BackupStatusFilter'
import BackupTypeFilter from '../filters/BackupTypeFilter'

export default {
  components: {
    BackupStatusFilter,
    BackupTypeFilter,
    ItemListErrors,
    ApiTable
  },
  data: function () {
    return {
      columns: ['id', 'type.id', 'name', 'size', 'status.id', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'size', 'columnDeadline', 'columnCreatedAt', 'columnUpdatedAt'],
      customFilters: ['type.id', 'status.id'],
      sortable: ['type.id', 'id', 'name', 'size', 'status.id', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        columnDeadline,
        'status.id': columnStatus,
        'type.id': columnType
      }
    }
  }
}
</script>
