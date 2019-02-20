<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('invoice_type.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'invoice_type'" :is-loading="isLoading"></item-errors>

          <InvoiceTypeForm

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
import InvoiceTypeForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    InvoiceTypeForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'invoice_type/item',
      errors: 'invoice_type/errors'
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
      getItem: 'invoice_type/getItem',
      reset: 'invoice_type/reset',
      update: 'invoice_type/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'InvoiceTypeShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
