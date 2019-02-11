<template>
<div>
  <section class="content-header">
    <h1>{{$t('channel.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'ChannelCreate' }" class="btn btn-primary pull-right">{{$t('channel.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'channel'"></item-errors>

        <api-table
                :entity="'Channel'"
                :route="'channels'"
                :path="'channel'"
                :filterable="filterable"
                :sortable="sortable"
                :columns="columns"
                :templates="templates"
        ></api-table>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import ItemErrors from '../layout/errors/ItemErrors'
import ApiTable from '../ApiTable'
import columnCreatedAt from './../../table/ColumnCreatedAt'
import columnUpdatedAt from './../../table/ColumnUpdatedAt'

export default {
  components: {ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'name', 'currency.name', 'columnCreatedAt', 'columnUpdatedAt', 'actions'],
      filterable: ['id', 'name', 'currency.name', 'columnCreatedAt', 'columnUpdatedAt'],
      sortable: ['id', 'name', 'currency.name', 'columnCreatedAt', 'columnUpdatedAt'],
      templates: {
        columnCreatedAt,
        columnUpdatedAt
      }
    }
  },
}
</script>
