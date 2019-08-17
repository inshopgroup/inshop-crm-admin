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
      reset: 'document/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'DocumentShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
