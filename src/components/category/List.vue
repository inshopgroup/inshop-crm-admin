<template>
<div>
  <section class="content-header">
    <h1>{{$t('category.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'CategoryCreate' }" class="btn btn-primary pull-right">{{$t('category.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'category'"></item-list-errors>

        <api-table
                :entity="'Category'"
                :route="'categories'"
                :path="'category'"
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
import columnTranslatedName from './../../table/ColumnTranslatedName'
import columnParentTranslatedName from './../../table/ColumnParentTranslatedName'

export default {
  components: {ItemListErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'columnTranslatedName', 'columnParentTranslatedName', 'isActive', 'position', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'columnTranslatedName', 'columnParentTranslatedName', 'isActive', 'position', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'parent.name', 'columnTranslatedName', 'columnParentTranslatedName', 'isActive', 'position', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnTranslatedName,
        columnParentTranslatedName,
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
