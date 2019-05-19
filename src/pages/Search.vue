<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('search_list') }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'text'" />

          <api-table
            :entity="'Search'"
            :route="'search'"
            :path="'search'"
            :filterable="filterable"
            :columns="columns"
            :templates="templates"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiTable from "../components/ApiTable"
import ItemErrors from "../components/layout/errors/ItemErrors"
import q from './../table/ColumnQ'

export default {
  components: {ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['q', 'type'],
      filterable: ['q', 'type'],
      templates: {
        q,
      }
    }
  }
}
</script>
