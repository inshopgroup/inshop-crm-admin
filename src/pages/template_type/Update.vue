<template>
  <is-main-template
    title="template_type_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'templateType/getItem',
      update: 'templateType/update',
      reset: 'templateType/reset'
    }),
    onSendForm() {
      this.update()
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
