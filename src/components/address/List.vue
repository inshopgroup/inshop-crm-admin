<template>
<div>
  <section class="content-header">
    <h1>{{$t('address.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'AddressCreate' }" class="btn btn-primary pull-right">{{$t('address.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-list-errors :entity="'address'"></item-list-errors>

        <api-table
                :entity="'Address'"
                :route="'addresses'"
                :path="'address'"
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
      columns: ['id', 'postCode', 'country.name', 'city.name', 'region', 'district', 'street', 'building', 'apartment', 'comment', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'postCode', 'country.name', 'city.name', 'region', 'district', 'street', 'building', 'apartment', 'comment', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'postCode', 'country.name', 'city.name', 'region', 'district', 'street', 'building', 'apartment', 'comment', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
