<template>
  <div>
    <section class="content-header">
      <h1>{{$t('channel.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'channel'" :is-loading="isLoading"></item-errors>

          <ChannelForm
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

import ChannelForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ChannelForm,
    ItemErrors
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'channel/item',
    isLoading: 'general/isLoading',
    errors: 'channel/errors'
  }),
  methods: {
    ...mapActions({
      create: 'channel/create',
      reset: 'channel/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ChannelShow', params: {id: created['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
