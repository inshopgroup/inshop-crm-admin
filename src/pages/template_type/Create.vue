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
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'templateType/create',
      reset: 'templateType/reset'
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
