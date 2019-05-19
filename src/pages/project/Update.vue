<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('project_edit', {entity: item && item.name}) }}</h1>
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'project/getItem',
      update: 'project/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'ProjectShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
