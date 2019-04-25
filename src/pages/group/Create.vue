<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('group_add') }}</h1>
    </section>

    <GroupForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import GroupForm from './Form'

  export default {
    components: {
      GroupForm
    },
    computed: {
      ...mapGetters({
        item: 'group/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'group/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'GroupShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
