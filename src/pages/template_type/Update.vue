<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template_type_edit', { entity: item && item.name }) }}</h1>
    </section>
    <TemplateTypeForm :handle-submit="onSendForm" :item="item" />
  </div>
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
  methods: {
    ...mapActions({
      getItem: 'templateType/getItem',
      update: 'templateType/update'
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
