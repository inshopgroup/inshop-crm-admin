<template>
  <div>
    <section class="content-header">
      <h1>{{$t('order_header.add')}}</h1>
    </section>

    <item-errors :entity="'order_header'" :is-loading="isLoading"></item-errors>

    <OrderHeaderForm
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
import OrderHeaderForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

const { mapGetters, mapActions } = createNamespacedHelpers('order_header/create')

export default {
  components: {
    OrderHeaderForm,
    ItemErrors
  },

  data () {
    return {
      item: {
        lines: []
      }
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

      this.$router.push({ name: 'OrderHeaderUpdate', params: { id: created['@id'] } })
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
