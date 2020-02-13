<template>
  <is-main-template title="text_list" route-add="TextCreate" entity="text">
    <api-table
      entity="Text"
      route="texts"
      path="text"
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
import columnIsActive from '../../table/ColumnIsActive'
import columnTranslatedTitle from '../../table/ColumnTranslatedTitle'

export default {
  components: { ApiTable },
  data() {
    return {
      columns: [
        'id',
        'columnTranslatedTitle',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'columnTranslatedTitle',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'columnTranslatedTitle',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnTranslatedTitle,
        columnCreatedAt,
        columnUpdatedAt,
        isActive: columnIsActive
      }
    }
  }
}
</script>
