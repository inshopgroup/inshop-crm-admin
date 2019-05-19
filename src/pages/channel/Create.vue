<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('channel_add') }}</h1>
    </section>
    <ChannelForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChannelForm from './Form'

export default {
  components: {
    ChannelForm
  },
  computed: {
    ...mapGetters({
      item: 'channel/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'channel/create'
    }),
    onSendForm () {
      this.create().then(item => {
        this.$router.push({name: 'ChannelShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
