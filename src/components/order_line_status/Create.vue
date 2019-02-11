<template>
  <div>
    <section class="content-header">
      <h1>{{$t('order_line_status.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'order_line_status'" :is-loading="isLoading"></item-errors>

          <OrderLineStatusForm
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
import OrderLineStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('order_line_status/create')

export default {
  components: {
    OrderLineStatusForm,
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

      this.$router.push({ name: 'OrderLineStatusUpdate', params: { id: created['@id'] } })
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
