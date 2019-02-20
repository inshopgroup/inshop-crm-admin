<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('currency.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'currency'" :is-loading="isLoading"></item-errors>

          <CurrencyForm

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
import CurrencyForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    CurrencyForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'currency/item',
      errors: 'currency/errors'
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
      getItem: 'currency/getItem',
      reset: 'currency/reset',
      update: 'currency/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'CurrencyShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
