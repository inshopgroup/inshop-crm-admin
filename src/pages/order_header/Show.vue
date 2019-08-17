<template>
  <is-show-template
    :fields="fields"
    entity="OrderHeader"
    :tabs="['lines']"
    :history-key="historyKey"
  >
    <template v-slot:lines="{ item }">
      <lines :lines="item.lines" />
    </template>
  </is-show-template>
</template>

<script>
import Lines from './Lines'

export default {
  components: {
    Lines
  },
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'number'
        },
        {
          property: 'client',
          path: 'client.name',
          link: {
            route: 'ClientShow',
            param: 'client.id'
          }
        },
        {
          property: 'channel',
          path: 'channel.name',
          link: {
            route: 'ChannelShow',
            param: 'channel.id'
          }
        },
        {
          property: 'paymentType',
          path: 'paymentType.name',
          link: {
            route: 'PaymentTypeShow',
            param: 'paymentType.id'
          }
        },
        {
          property: 'shipmentMethod',
          path: 'shipmentMethod.name',
          link: {
            route: 'ShipmentMethodShow',
            param: 'shipmentMethod.id'
          }
        },
        {
          property: 'status',
          path: 'status.name',
          link: {
            route: 'OrderStatusShow',
            param: 'status.id'
          }
        },
        {
          property: 'channel',
          path: 'channel.currency.name',
          link: {
            route: 'CurrencyShow',
            param: 'channel.currency.id'
          }
        }
      ]
    }
  }
}
</script>
