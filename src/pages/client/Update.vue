<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('client_edit', {entity: item && item.name}) }}</h1>
    </section>
    <ClientForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientForm from './Form'

export default {
  components: {
    ClientForm
  },
  computed: {
    ...mapGetters({
      item: 'client/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'client/getItem',
      update: 'client/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'ClientShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
