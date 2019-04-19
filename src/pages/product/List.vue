<template>
<div>
  <section class="content-header">
    <h1>{{$t('list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'ProductCreate' }" class="btn btn-primary pull-right">{{$t('add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'product'"></item-errors>

        <api-table
                :entity="'Product'"
                :route="'products'"
                :path="'product'"
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
import columnTranslatedName from './../../table/ColumnTranslatedName'

export default {
  components: {ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'columnTranslatedName', 'brand.name', 'category.name', 'ean', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'columnTranslatedName', 'brand.name', 'category.name', 'ean', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'columnTranslatedName', 'brand.name', 'category.name', 'ean', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnTranslatedName,
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
