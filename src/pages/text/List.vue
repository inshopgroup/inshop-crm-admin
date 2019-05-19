<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('text_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'TextCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('text_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors :entity="'text'" />
          <api-table
            :entity="'Text'"
            :route="'texts'"
            :path="'text'"
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
  components: { ItemErrors, ApiTable },
  data: function () {
    return {
      columns: ['id', 'title', 'slug', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'title', 'slug', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'title', 'slug', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  }
}
</script>
