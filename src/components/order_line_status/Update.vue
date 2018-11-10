<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_line_status.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-update-errors :entity="'order_line_status'" :is-loading="isLoading"></item-update-errors>

          <OrderLineStatusForm
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
import OrderLineStatusForm from './Form.vue'
import ItemUpdateErrors from '../layout/errors/ItemUpdateErrors'

export default {
  components: {
    ItemUpdateErrors,
    OrderLineStatusForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'order_line_status/update/isLoading',
      deleted: 'order_line_status/del/deleted',
      retrieved: 'order_line_status/update/retrieved',
      violations: 'order_line_status/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'OrderLineStatusList' })
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
      createReset: 'order_line_status/create/reset',
      delReset: 'order_line_status/del/reset',
      retrieve: 'order_line_status/update/retrieve',
      updateReset: 'order_line_status/update/reset',
      update: 'order_line_status/update/update',
      updateRetrieved: 'order_line_status/update/updateRetrieved'
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
