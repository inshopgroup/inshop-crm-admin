<template>
  <div>
    <section class="content-header">
      <h1>{{$t('invoice_header.add')}}</h1>
    </section>

    <item-create-errors :entity="'invoice_header'" :is-loading="isLoading"></item-create-errors>

    <InvoiceHeaderForm
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      v-if="!isLoading"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import InvoiceHeaderForm from './Form'
import ItemCreateErrors from '../layout/errors/ItemCreateErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('invoice_header/create')

export default {
  components: {
    InvoiceHeaderForm,
    ItemCreateErrors
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

      this.$router.push({ name: 'InvoiceHeaderUpdate', params: { id: created['@id'] } })
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
