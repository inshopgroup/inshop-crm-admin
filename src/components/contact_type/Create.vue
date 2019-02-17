<template>
  <div>
    <section class="content-header">
      <h1>{{$t('contact_type.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'contact_type'" :is-loading="isLoading"></item-errors>

          <ContactTypeForm
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

import ContactTypeForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ContactTypeForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'contact_type/item',
    isLoading: 'general/isLoading',
    errors: 'contact_type/errors'
  }),

  methods: {
    ...mapActions({
      create: 'contact_type/create',
      reset: 'contact_type/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ContactTypeShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
