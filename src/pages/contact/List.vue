<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'ContactCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('contact_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors entity="contact" />
          <api-table
            entity="Contact"
            route="contacts"
            path="contact"
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
import columnIsActive from './../../table/ColumnIsActive'

export default {
  components: { ItemErrors, ApiTable },
  data: function () {
    return {
      columns: ['id', 'value', 'contactType.name', 'isActive', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'value', 'contactType.name', 'isActive', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'value', 'contactType.name', 'isActive', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        'isActive': columnIsActive
      }
    }
  },
}
</script>
