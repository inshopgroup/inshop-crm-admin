<template>
<div>
  <section class="content-header">
    <h1>{{$t('template.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'TemplateCreate' }" class="btn btn-primary pull-right">{{$t('template.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'template'"></item-list-errors>

        <api-table
                :entity="'Template'"
                :route="'templates'"
                :path="'template'"
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
      columns: ['id', 'name', 'type.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'type.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'type.name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
