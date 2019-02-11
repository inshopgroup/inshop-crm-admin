<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('order_header.edit', {entity: retrieved && retrieved.number}) }}</h1>
    </section>

    <item-errors :entity="'order_header'" :is-loading="isLoading"></item-errors>

    <OrderHeaderForm
      v-if="item && !isLoading"
      :handle-submit="onSendForm"
      :handle-update-field="updateField"
      :values="item"
      :errors="violations"
      :initial-values="retrieved" />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderHeaderForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    OrderHeaderForm
  },

  data () {
    return {
      item: {
        lines: []
      }
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      deleted: 'order_header/del/deleted',
      retrieved: 'order_header/update/retrieved',
      violations: 'order_header/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'OrderHeaderList' })
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
      createReset: 'order_header/create/reset',
      delReset: 'order_header/del/reset',
      retrieve: 'order_header/update/retrieve',
      updateReset: 'order_header/update/reset',
      update: 'order_header/update/update',
      updateRetrieved: 'order_header/update/updateRetrieved'
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
