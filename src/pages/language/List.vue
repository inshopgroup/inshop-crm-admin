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
        <item-errors :entity="'language'"></item-errors>

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
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'

export default {
  components: {ItemErrors, ApiTable},
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
