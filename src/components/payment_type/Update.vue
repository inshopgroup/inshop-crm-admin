<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('payment_type.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-update-errors :entity="'payment_type'" :is-loading="isLoading"></item-update-errors>

          <PaymentTypeForm
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
import PaymentTypeForm from './Form.vue'
import ItemUpdateErrors from '../layout/errors/ItemUpdateErrors'

export default {
  components: {
    ItemUpdateErrors,
    PaymentTypeForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'payment_type/update/isLoading',
      deleted: 'payment_type/del/deleted',
      retrieved: 'payment_type/update/retrieved',
      violations: 'payment_type/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'PaymentTypeList' })
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      createReset: 'payment_type/create/reset',
      delReset: 'payment_type/del/reset',
      retrieve: 'payment_type/update/retrieve',
      updateReset: 'payment_type/update/reset',
      update: 'payment_type/update/update',
      updateRetrieved: 'payment_type/update/updateRetrieved'
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
