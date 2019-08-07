<template>
  <is-main-template title="template_type_add">
    <template-type-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TemplateTypeForm from './Form'

export default {
  components: {
    TemplateTypeForm
  },
  computed: {
    ...mapGetters({
      item: 'templateType/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'templateType/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'TemplateTypeShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
