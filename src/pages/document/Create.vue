<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('document_add') }}</h1>
    </section>

    <DocumentForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      create: 'document/create'
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
