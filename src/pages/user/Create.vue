<template>
  <is-main-template title="user_add">
    <user-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserForm from './Form'

export default {
  components: {
    UserForm
  },
  computed: {
    ...mapGetters({
      item: 'user/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'user/create',
      reset: 'user/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'UserShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
