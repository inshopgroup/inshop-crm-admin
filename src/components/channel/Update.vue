<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('channel.edit', {entity: item && item.name}) }}</h1>
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
import { mapActions, mapGetters } from 'vuex'
import ChannelForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    ChannelForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'channel/item',
      errors: 'channel/errors'
    })
  },



  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      getItem: 'channel/getItem',
      reset: 'channel/reset',
      update: 'channel/update',
    }),

    onSendForm () {
      this.update()
    }
  }
}
</script>
