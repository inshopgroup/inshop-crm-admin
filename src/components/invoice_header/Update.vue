<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_header.edit', {entity: retrieved && retrieved.number}) }}</h1>
    </section>

    <item-update-errors :entity="'invoice_header'" :is-loading="isLoading"></item-update-errors>

    <InvoiceHeaderForm
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :errors="violations"
      :initial-values="retrieved" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InvoiceHeaderForm from './Form.vue'
import ItemUpdateErrors from '../layout/errors/ItemUpdateErrors'

export default {
  components: {
    ItemUpdateErrors,
    InvoiceHeaderForm
  },

  computed: {
    ...mapGetters({
      isLoading: 'invoice_header/update/isLoading',
      deleted: 'invoice_header/del/deleted',
      retrieved: 'invoice_header/update/retrieved',
      violations: 'invoice_header/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'InvoiceHeaderList' })
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
      createReset: 'invoice_header/create/reset',
      delReset: 'invoice_header/del/reset',
      retrieve: 'invoice_header/update/retrieve',
      updateReset: 'invoice_header/update/reset',
      update: 'invoice_header/update/update',
      updateRetrieved: 'invoice_header/update/updateRetrieved'
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
