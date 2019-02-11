<template>
  <div>
    <section class="content-header">
      <h1>{{$t('address.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'address'" :is-loading="isLoading"></item-errors>

          <AddressForm
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

import AddressForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    AddressForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'address/item',
    isLoading: 'general/isLoading',
    errors: 'address/errors'
  }),
  methods: {
    ...mapActions({
      create: 'address/create',
      reset: 'address/reset'
    }),
    onSendForm() {
      this.create().then(created => {
        this.$router.push({name: 'AddressShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
