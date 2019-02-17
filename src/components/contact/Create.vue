<template>
  <div>
    <section class="content-header">
      <h1>{{$t('contact.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'contact'" :is-loading="isLoading"></item-errors>

          <ContactForm
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

import ContactForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ContactForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'contact/item',
    isLoading: 'general/isLoading',
    errors: 'contact/errors'
  }),

  methods: {
    ...mapActions({
      create: 'contact/create',
      reset: 'contact/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ContactShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
