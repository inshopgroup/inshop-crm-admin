<template>
  <div>
    <section class="content-header">
      <h1>{{$t('country.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'country'" :is-loading="isLoading"></item-errors>

          <CountryForm
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

import CountryForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    CountryForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'country/item',
    isLoading: 'general/isLoading',
    errors: 'country/errors'
  }),

  methods: {
    ...mapActions({
      create: 'country/create',
      reset: 'country/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'CountryShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
