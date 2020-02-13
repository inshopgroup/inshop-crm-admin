<template>
  <is-main-template
    title="order_header_list"
    route-add="OrderHeaderCreate"
    entity="orderHeader"
  >
    <api-table
      entity="OrderHeader"
      route="order_headers"
      path="order_header"
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

export default {
  components: { ApiTable },
  data() {
    return {
      columns: [
        'id',
        'number',
        'client.name',
        'status.name',
        'channel.name',
        'channel.currency.name',
        'paymentType.name',
        'shipmentMethod.name',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt',
        'actions'
      ],
      filterable: [
        'id',
        'number',
        'client.name',
        'status.name',
        'channel.name',
        'channel.currency.name',
        'paymentType.name',
        'shipmentMethod.name',
        'isActive',
        'columnCreatedAt',
        'columnUpdatedAt'
      ],
      sortable: [
        'id',
        'number',
        'client.name',
        'status.name',
        'channel.name',
        'channel.currency.name',
        'paymentType.name',
        'shipmentMethod.name',
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
