<template>
  <is-main-template
    title="client_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'client/getItem',
      update: 'client/update',
      reset: 'client/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'ClientShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
