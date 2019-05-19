<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('document_edit', {entity: item && item.name}) }}</h1>
    </section>
    <DocumentForm
      :handle-submit="onSendForm"
      :item="item"
    />
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'document/getItem',
      update: 'document/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'DocumentShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
