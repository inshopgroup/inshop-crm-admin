<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project_type_edit', {entity: item && item.name}) }}</h1>
    </section>

    <ProjectTypeForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ProjectTypeForm from './Form'

  export default {
    components: {
      ProjectTypeForm
    },
    computed: {
      ...mapGetters({
        item: 'project_type/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'project_type/getItem',
        update: 'project_type/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'ProjectTypeShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
