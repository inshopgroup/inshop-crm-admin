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
    DocumentForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'document/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'document/create',
      reset: 'document/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'document-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
