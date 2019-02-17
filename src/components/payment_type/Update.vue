<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('payment_type.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'payment_type'" :is-loading="isLoading"></item-errors>

          <PaymentTypeForm

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
import PaymentTypeForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    PaymentTypeForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'payment_type/item',
      errors: 'payment_type/errors'
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
      getItem: 'payment_type/getItem',
      reset: 'payment_type/reset',
      update: 'payment_type/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'PaymentTypeShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
