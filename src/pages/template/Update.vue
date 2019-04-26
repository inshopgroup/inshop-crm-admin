<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template_edit', {entity: item && item.name}) }}</h1>
    </section>

    <TemplateForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import TemplateForm from './Form'

  export default {
    components: {
      TemplateForm
    },
    computed: {
      ...mapGetters({
        item: 'template/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'template/getItem',
        update: 'template/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'TemplateShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
