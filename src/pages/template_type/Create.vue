<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template_type_add') }}</h1>
    </section>

    <TemplateTypeForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TemplateTypeForm from './Form'

  export default {
    components: {
      TemplateTypeForm,
    },
    computed: {
      ...mapGetters({
        item: 'template_type/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'template_type/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'TemplateTypeShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
