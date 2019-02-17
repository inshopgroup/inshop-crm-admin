<template>
  <div>
    <section class="content-header">
      <h1>{{$t('city.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'city'" :is-loading="isLoading"></item-errors>

          <CityForm
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

import CityForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    CityForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },

  computed: mapGetters({
    item: 'city/item',
    isLoading: 'general/isLoading',
    errors: 'city/errors'
  }),

  methods: {
    ...mapActions({
      create: 'city/create',
      reset: 'city/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'CityShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
