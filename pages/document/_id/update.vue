<template>
  <is-main-template
    title="document_edit"
    :title-params="{ entity: item && item.name }"
  >
    <document-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DocumentForm from '../Form'

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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'document/getItem',
      update: 'document/update',
      reset: 'document/reset',
    }),
    onSendForm() {
      this.update()
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
