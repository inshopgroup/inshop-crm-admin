<template>
  <is-main-template title="language_list" route-add="LanguageCreate" entity="language">
    <api-table
      entity="Language"
      route="languages"
      path="language"
      :filterable="filterable"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    />
  </is-main-template>
</template>

<script>
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
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
        'code',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'name',
        'code',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'name',
        'code',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnCreatedAt,
        columnUpdatedAt,
        isActive: columnIsActive
      }
    }
  }
}
</script>
