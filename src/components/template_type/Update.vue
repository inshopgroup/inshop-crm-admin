<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template_type.edit', {entity: item && item.name}) }}</h1>
    </section>

    <TemplateTypeForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import TemplateTypeForm from './Form'

  export default {
    components: {
      TemplateTypeForm
    },
    computed: {
      ...mapGetters({
        item: 'template_type/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'template_type/getItem',
        update: 'template_type/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'TemplateTypeShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
