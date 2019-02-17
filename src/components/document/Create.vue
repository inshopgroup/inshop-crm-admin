<template>
  <div>
    <section class="content-header">
      <h1>{{$t('document.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'template'" :is-loading="isLoading"></item-errors>

          <DocumentForm
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

import DocumentForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ItemErrors,
    DocumentForm
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'document/item',
    isLoading: 'general/isLoading',
    errors: 'document/errors'
  }),

  methods: {
    ...mapActions({
      create: 'document/create',
      reset: 'document/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'DocumentShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
