<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('shipment_method.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'shipment_method'" :is-loading="isLoading"></item-errors>

          <ShipmentMethodForm
            v-if="item && !isLoading"
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :values="item"
            :errors="violations"
            :initial-values="retrieved" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ShipmentMethodForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ShipmentMethodForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'shipment_method/update/isLoading',
      deleted: 'shipment_method/del/deleted',
      retrieved: 'shipment_method/update/retrieved',
      violations: 'shipment_method/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'ShipmentMethodList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'shipment_method/create/reset',
      delReset: 'shipment_method/del/reset',
      retrieve: 'shipment_method/update/retrieve',
      updateReset: 'shipment_method/update/reset',
      update: 'shipment_method/update/update',
      updateRetrieved: 'shipment_method/update/updateRetrieved'
    }),

    reset () {
      this.updateReset()
      this.delReset()
      this.createReset()
    },

    onSendForm () {
      this.update()
    },

    updateField (field, value) {
      this.updateRetrieved({ [field]: value })
    }
  }
}
</script>
