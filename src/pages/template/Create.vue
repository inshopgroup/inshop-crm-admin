<template>
  <is-main-template title="template_add">
    <template-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TemplateForm from './Form'

export default {
  components: {
    TemplateForm
  },
  computed: {
    ...mapGetters({
      item: 'template/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'template/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'TemplateShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
