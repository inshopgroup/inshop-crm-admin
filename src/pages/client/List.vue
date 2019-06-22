<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('client_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'ClientCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('client_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors entity="client" />
          <api-table
            entity="Client"
            route="clients"
            path="client"
            :filterable="filterable"
            :columns="columns"
            :templates="templates"
            :sortable="sortable"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnContacts from './../../table/ColumnContacts'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'
import columnIsActive from './../../table/ColumnIsActive'

export default {
  components: { ItemErrors, ApiTable },
  data: function() {
    return {
      columns: [
        'id',
        'name',
        'contacts.value',
        'description',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'name',
        'contacts.value',
        'description',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'name',
        'description',
        'columnCreatedAt',
        'isActive',
        'columnUpdatedAt'
      ],
      templates: {
        'contacts.value': columnContacts,
        columnCreatedAt,
        columnUpdatedAt,
        isActive: columnIsActive
      }
    }
  }
}
</script>
