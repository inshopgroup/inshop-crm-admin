<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('category_list') }}</h1>
    </section>
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <router-link
            :to="{ name: 'CategoryCreate' }"
            class="btn btn-primary pull-right"
          >
            {{ $t('category_add') }}
          </router-link>
        </div>
        <div class="box-body">
          <item-errors entity="category" />
          <api-table
            entity="Category"
            route="categories"
            path="category"
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
import columnTranslatedName from './../../table/ColumnTranslatedName'
import columnParentTranslatedName from './../../table/ColumnParentTranslatedName'
import columnIsActive from './../../table/ColumnIsActive'

export default {
  components: { ItemErrors, ApiTable },
  data: function () {
    return {
      columns: ['id', 'columnTranslatedName', 'columnParentTranslatedName', 'position', 'isActive', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'columnTranslatedName', 'columnParentTranslatedName', 'position', 'isActive', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'parent.name', 'columnTranslatedName', 'columnParentTranslatedName', 'position', 'isActive', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnTranslatedName,
        columnParentTranslatedName,
        columnCreatedAt,
        columnUpdatedAt,
        'isActive': columnIsActive
      }
    }
  },
}
</script>
