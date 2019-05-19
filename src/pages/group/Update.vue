<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('group_edit', {entity: item && item.name}) }}</h1>
    </section>
    <GroupForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GroupForm from './Form'

export default {
  components: {
    GroupForm
  },
  computed: {
    ...mapGetters({
      item: 'group/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'group/getItem',
      update: 'group/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'GroupShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
