<template>
  <is-main-template
    title="product_list"
    route-add="ProductCreate"
    entity="product"
  >
    <api-table
      entity="Product"
      route="products"
      path="product"
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
import columnIsActive from '../../table/ColumnIsActive'

export default {
  components: { ApiTable },
  data() {
    return {
      columns: [
        'id',
        'columnTranslatedName',
        'brand.name',
        'category.name',
        'ean',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'columnTranslatedName',
        'brand.name',
        'category.name',
        'ean',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'columnTranslatedName',
        'brand.name',
        'category.name',
        'ean',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      templates: {
        columnTranslatedName,
        columnCreatedAt,
        columnUpdatedAt,
        isActive: columnIsActive
      }
    }
  }
}
</script>
