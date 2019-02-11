<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('address.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'address'" :is-loading="isLoading"></item-errors>

          <AddressForm
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
import AddressForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    AddressForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      deleted: 'address/del/deleted',
      retrieved: 'address/update/retrieved',
      violations: 'address/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'AddressList' })
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
      createReset: 'address/create/reset',
      delReset: 'address/del/reset',
      retrieve: 'address/update/retrieve',
      updateReset: 'address/update/reset',
      update: 'address/update/update',
      updateRetrieved: 'address/update/updateRetrieved'
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
