<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('currency.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'currency'" :is-loading="isLoading"></item-errors>

          <CurrencyForm
            v-if="item && !isLoading"
            :handle-submit="onSendForm"
            :handle-update-field="updateField"
            :values="item"
            :errors="violations"
            :initial-values="retrieved" />
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

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      deleted: 'currency/del/deleted',
      retrieved: 'currency/update/retrieved',
      violations: 'currency/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'CurrencyList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'currency/create/reset',
      delReset: 'currency/del/reset',
      retrieve: 'currency/update/retrieve',
      updateReset: 'currency/update/reset',
      update: 'currency/update/update',
      updateRetrieved: 'currency/update/updateRetrieved'
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
