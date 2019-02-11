<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_status.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'order_status'" :is-loading="isLoading"></item-errors>

          <OrderStatusForm
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
import OrderStatusForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    OrderStatusForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      deleted: 'order_status/del/deleted',
      retrieved: 'order_status/update/retrieved',
      violations: 'order_status/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'OrderStatusList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'order_status/create/reset',
      delReset: 'order_status/del/reset',
      retrieve: 'order_status/update/retrieve',
      updateReset: 'order_status/update/reset',
      update: 'order_status/update/update',
      updateRetrieved: 'order_status/update/updateRetrieved'
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
