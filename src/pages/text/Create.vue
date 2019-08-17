<template>
  <is-main-template title="text_add">
    <text-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TextForm from './Form'

export default {
  components: {
    TextForm
  },
  computed: {
    ...mapGetters({
      item: 'text/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'text/create',
      reset: 'text/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'TextShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
