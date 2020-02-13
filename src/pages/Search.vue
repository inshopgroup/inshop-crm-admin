<template>
  <is-main-template title="search_list">
    <api-table
      entity="Search"
      route="search"
      path="search"
      :filterable="filterable"
      :columns="columns"
      :templates="templates"
    />
  </is-main-template>
</template>

<script>
import ApiTable from '../components/ApiTable'
import q from '../table/ColumnQ'

export default {
  components: { ApiTable },
  data() {
    return {
      columns: ['q', 'type'],
      filterable: ['q', 'type'],
      templates: {
        q
      }
    }
  }
}
</script>
