<template>
  <div>
    <section class="content-header">
      <h1>{{$t('vat.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'vat'" :is-loading="isLoading"></item-errors>

          <VatForm
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

import VatForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    VatForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'vat/item',
    isLoading: 'general/isLoading',
    errors: 'vat/errors'
  }),
  methods: {
    ...mapActions({
      create: 'vat/create',
      reset: 'vat/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'VatShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
