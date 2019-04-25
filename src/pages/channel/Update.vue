<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('channel_edit', {entity: item && item.name}) }}</h1>
    </section>

    <ChannelForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ChannelForm from './Form'

  export default {
    components: {
      ChannelForm
    },
    computed: {
      ...mapGetters({
        item: 'channel/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'channel/getItem',
        update: 'channel/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'ChannelShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
