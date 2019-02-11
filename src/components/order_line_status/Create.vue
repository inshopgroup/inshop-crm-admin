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

            :item="item"
            :errors="errors"

          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import OrderLineStatusForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    OrderLineStatusForm,
    ItemErrors
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
