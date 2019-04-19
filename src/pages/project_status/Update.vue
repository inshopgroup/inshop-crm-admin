<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('edit', {entity: item && item.name}) }}</h1>
    </section>

    <ProjectStatusForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ProjectStatusForm from './Form'

  export default {
    components: {
      ProjectStatusForm
    },
    computed: {
      ...mapGetters({
        item: 'project_status/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'project_status/getItem',
        update: 'project_status/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'ProjectStatusShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
