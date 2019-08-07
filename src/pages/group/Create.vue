<template>
  <div class="user-groups">
    <is-main-template title="group_add">
      <group-form :handle-submit="onSendForm" :item="item" />
    </is-main-template>
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
  methods: {
    ...mapActions({
      create: 'group/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'GroupShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
