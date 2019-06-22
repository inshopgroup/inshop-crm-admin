<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template_add') }}</h1>
    </section>
    <TemplateForm :handle-submit="onSendForm" :item="item" />
  </div>
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
