<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('client.edit', {entity: retrieved && retrieved.name}) }}</h1>
    </section>

    <item-errors :entity="'client'" :is-loading="isLoading"></item-errors>

    <ClientForm
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
import ClientForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ClientForm
  },

  data () {
    return {
      item: {}
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      deleted: 'client/del/deleted',
      retrieved: 'client/update/retrieved',
      violations: 'client/update/violations'
    })
  },

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    deleted: function (deleted) {
      if (!deleted) {
        return
      }

      this.$router.push({ name: 'ClientList' })
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
      createReset: 'client/create/reset',
      delReset: 'client/del/reset',
      retrieve: 'client/update/retrieve',
      updateReset: 'client/update/reset',
      update: 'client/update/update',
      updateRetrieved: 'client/update/updateRetrieved'
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
