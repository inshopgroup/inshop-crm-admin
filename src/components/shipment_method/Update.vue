<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('shipment_method.edit', {entity: item && item.name}) }}</h1>
    </section>

    <ShipmentMethodForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ShipmentMethodForm from './Form'

  export default {
    components: {
      ShipmentMethodForm
    },
    computed: {
      ...mapGetters({
        item: 'shipment_method/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'shipment_method/getItem',
        update: 'shipment_method/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'ShipmentMethodShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
