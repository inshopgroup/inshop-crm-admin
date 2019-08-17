<template>
  <is-main-template
    title="template_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'template/getItem',
      update: 'template/update',
      reset: 'template/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'TemplateShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
