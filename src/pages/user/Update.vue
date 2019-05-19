<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('user_edit', {entity: item && item.name}) }}</h1>
    </section>
    <UserForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
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
  created () {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'user/getItem',
      update: 'user/update'
    }),
    onSendForm () {
      this.update().then(item => {
        this.$router.push({ name: 'UserShow', params: { id: item.id}} )
      }).catch()
    }
  }
}
</script>
