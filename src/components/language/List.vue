<template>
<div>
  <section class="content-header">
    <h1>{{$t('language.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'LanguageCreate' }" class="btn btn-primary pull-right">{{$t('language.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'language'"></item-list-errors>

        <api-table
                :entity="'Language'"
                :route="'languages'"
                :path="'language'"
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
      columns: ['id', 'name', 'code', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'code', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'code', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
