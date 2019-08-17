<template>
  <is-main-template
    title="channel_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'channel/getItem',
      update: 'channel/update',
      reset: 'channel/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'ChannelShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
