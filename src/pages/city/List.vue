<template>
<div>
  <section class="content-header">
    <h1>{{$t('city_list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'CityCreate' }" class="btn btn-primary pull-right">{{$t('city_add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'city'"></item-errors>

        <api-table
                :entity="'City'"
                :route="'cities'"
                :path="'city'"
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
      columns: ['id', 'name', 'country.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'country.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'country.name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
