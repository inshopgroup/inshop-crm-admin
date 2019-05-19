<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('address_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'AddressCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('address_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors :entity="'address'" />

          <api-table
            :entity="'Address'"
            :route="'addresses'"
            :path="'address'"
            :filterable="filterable"
            :sortable="sortable"
            :columns="columns"
            :templates="templates"
          />
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
