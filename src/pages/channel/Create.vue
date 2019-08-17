<template>
  <is-main-template title="channel_add">
    <channel-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
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
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'channel/create',
      reset: 'channel/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'ChannelShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
