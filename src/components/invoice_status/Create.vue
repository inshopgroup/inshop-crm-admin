<template>
  <div>
    <section class="content-header">
      <h1>{{$t('invoice_status.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'invoice_status'" :is-loading="isLoading"></item-errors>

          <InvoiceStatusForm
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :values="item"
            :errors="violations"
            v-if="!isLoading"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import InvoiceStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('invoice_status/create')

export default {
  components: {
    InvoiceStatusForm,
    ItemErrors
  },

  data () {
    return {
      item: {}
    }
  },

  computed: mapGetters([
    'isLoading',
    'created',
    'violations'
  ]),

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    created: function (created) {
      if (!created) {
        return
      }

      this.$router.push({ name: 'InvoiceStatusUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm () {
      this.create(this.item)
    },

    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    }
  }
}
</script>
