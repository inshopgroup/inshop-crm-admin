<template>
  <is-main-template title="client_add">
    <client-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
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
  methods: {
    ...mapActions({
      create: 'client/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'ClientShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
