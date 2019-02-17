<template>
  <div>
    <section class="content-header">
      <h1>{{$t('shipment_method.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'shipment_method'" :is-loading="isLoading"></item-errors>

          <ShipmentMethodForm
            :handle-submit="onSendForm"

            :item="item"
            :errors="errors"

          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import ShipmentMethodForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ShipmentMethodForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'shipment_method/item',
    isLoading: 'general/isLoading',
    errors: 'shipment_method/errors'
  }),
  methods: {
    ...mapActions({
      create: 'shipment_method/create',
      reset: 'shipment_method/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ShipmentMethodShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
