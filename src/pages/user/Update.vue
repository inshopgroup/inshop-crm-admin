<template>
  <is-main-template
    title="user_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'user/getItem',
      update: 'user/update',
      reset: 'user/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'UserShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
