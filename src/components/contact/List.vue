<template>
<div>
  <section class="content-header">
    <h1>{{$t('contact.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'ContactCreate' }" class="btn btn-primary pull-right">{{$t('contact.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'contact'"></item-list-errors>

        <api-table
                :entity="'Contact'"
                :route="'contacts'"
                :path="'contact'"
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
      columns: ['id', 'value', 'contactType.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'value', 'contactType.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'value', 'contactType.name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
