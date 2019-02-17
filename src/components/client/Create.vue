<template>
  <div>
    <section class="content-header">
      <h1>{{$t('client.add')}}</h1>
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

import ClientForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ItemErrors,
    ClientForm
  },
  beforeDestroy() {
    this.reset()
  },

  data () {
    return {
      item: {
        contacts: [],
        projects: []
      }
    }
  },

  computed: mapGetters({
    item: 'client/item',
    isLoading: 'general/isLoading',
    errors: 'client/errors'
  }),

  methods: {
    ...mapActions({
      create: 'client/create',
      reset: 'client/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ClientShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
