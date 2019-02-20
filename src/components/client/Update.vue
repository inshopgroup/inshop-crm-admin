<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('client.edit', {entity: item && item.name}) }}</h1>
    </section>

    <item-errors :entity="'client'" :is-loading="isLoading"></item-errors>

    <ClientForm

      :handle-submit="onSendForm"

      :item="item"
      :errors="errors"
      />
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



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'client/item',
      errors: 'client/errors'
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
      getItem: 'client/getItem',
      reset: 'client/reset',
      update: 'client/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'ClientShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
