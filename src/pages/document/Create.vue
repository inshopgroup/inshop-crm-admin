<template>
  <is-main-template title="document_add">
    <document-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DocumentForm from './Form'

export default {
  components: {
    DocumentForm
  },
  computed: {
    ...mapGetters({
      item: 'document/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'document/create',
      reset: 'document/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'DocumentShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
