<template>
<div>
  <section class="content-header">
    <h1>{{$t('client.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'ClientCreate' }" class="btn btn-primary pull-right">{{$t('client.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'client'"></item-errors>

        <api-table
                :entity="'Client'"
                :route="'clients'"
                :path="'client'"
                :filterable="filterable"
                :columns="columns"
                :templates="templates"
                :sortable="sortable"
        ></api-table>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import ItemErrors from '../layout/errors/ItemErrors'
import ApiTable from '../ApiTable'
import columnContacts from './../../table/ColumnContacts'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'

export default {
  components: {ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['name', 'contacts.value', 'description', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['name', 'contacts.value', 'description', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['name', 'description', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        'contacts.value': columnContacts,
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
