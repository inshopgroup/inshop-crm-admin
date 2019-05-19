<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project_add') }}</h1>
    </section>
    <ProjectForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProjectForm from './Form'

export default {
  components: {
    ProjectForm
  },
  computed: {
    ...mapGetters({
      item: 'project/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'project/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'ProjectShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
