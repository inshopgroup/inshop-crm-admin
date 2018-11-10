<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_status.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-update-errors :entity="'invoice_status'" :is-loading="isLoading"></item-update-errors>

          <InvoiceStatusForm
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
import InvoiceStatusForm from './Form.vue'
import ItemUpdateErrors from '../layout/errors/ItemUpdateErrors'

export default {
  components: {
    ItemUpdateErrors,
    InvoiceStatusForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'invoice_status/update/isLoading',
      deleted: 'invoice_status/del/deleted',
      retrieved: 'invoice_status/update/retrieved',
      violations: 'invoice_status/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'InvoiceStatusList' })
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
      createReset: 'invoice_status/create/reset',
      delReset: 'invoice_status/del/reset',
      retrieve: 'invoice_status/update/retrieve',
      updateReset: 'invoice_status/update/reset',
      update: 'invoice_status/update/update',
      updateRetrieved: 'invoice_status/update/updateRetrieved'
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
