<template>
  <div>
    <section class="content-header">
      <h1>{{$t('language.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'language'" :is-loading="isLoading"></item-errors>

          <LanguageForm
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

import LanguageForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    LanguageForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'language/item',
    isLoading: 'general/isLoading',
    errors: 'language/errors'
  }),

  methods: {
    ...mapActions({
      create: 'language/create',
      reset: 'language/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'LanguageShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
