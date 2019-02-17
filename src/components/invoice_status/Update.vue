<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_status.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'invoice_status'" :is-loading="isLoading"></item-errors>

          <InvoiceStatusForm

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
import { mapActions, mapGetters } from 'vuex'
import InvoiceStatusForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    InvoiceStatusForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'invoice_status/item',
      errors: 'invoice_status/errors'
    })
  },



  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      getItem: 'invoice_status/getItem',
      reset: 'invoice_status/reset',
      update: 'invoice_status/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'InvoiceStatusShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
