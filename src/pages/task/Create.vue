<template>
  <div>
    <section class="content-header">
      <h1>{{$t('add')}}</h1>
    </section>

    <TaskForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TaskForm from './Form'

  export default {
    components: {
      TaskForm
    },
    computed: {
      ...mapGetters({
        item: 'task/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'task/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'TaskShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
