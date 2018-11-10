<template>
<div>
  <section class="content-header">
    <h1>{{$t('vat.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'VatCreate' }" class="btn btn-primary pull-right">{{$t('vat.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'vat'"></item-list-errors>

        <api-table
                :entity="'Vat'"
                :route="'vats'"
                :path="'vat'"
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
      columns: ['id', 'name', 'value', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'value', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'value', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
