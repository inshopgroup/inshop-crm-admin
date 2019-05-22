<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('shipment_method_edit', {entity: item && item.name}) }}</h1>
    </section>
    <ShipmentMethodForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ShipmentMethodForm from './Form'

export default {
  components: {
    ShipmentMethodForm
  },
  computed: {
    ...mapGetters({
      item: 'shipmentMethod/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'shipmentMethod/getItem',
      update: 'shipmentMethod/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'ShipmentMethodShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
