<template>
  <is-main-template
    title="category_list"
    route-add="CategoryCreate"
    entity="category"
  >
    <api-table
      entity="Category"
      route="categories"
      path="category"
      :filterable="filterable"
      :sortable="sortable"
      :columns="columns"
      :templates="templates"
    />
  </is-main-template>
</template>

<script>
import ApiTable from '../../components/ApiTable'
import columnCreatedAt from '../../table/ColumnCreatedAt'
import columnUpdatedAt from '../../table/ColumnUpdatedAt'
import columnTranslatedName from '../../table/ColumnTranslatedName'
import columnParentTranslatedName from '../../table/ColumnParentTranslatedName'
import columnIsActive from '../../table/ColumnIsActive'

export default {
  components: { ApiTable },
  data() {
    return {
      columns: [
        'id',
        'columnTranslatedName',
        'columnParentTranslatedName',
        'position',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'columnTranslatedName',
        'columnParentTranslatedName',
        'position',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'name',
        'parent.name',
        'columnTranslatedName',
        'columnParentTranslatedName',
        'position',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnTranslatedName,
        columnParentTranslatedName,
        columnCreatedAt,
        columnUpdatedAt,
        isActive: columnIsActive
      }
    }
  }
}
</script>
