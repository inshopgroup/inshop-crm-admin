<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('user_add') }}</h1>
    </section>

    <UserForm :handle-submit="onSendForm" :item="item" />
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
        item: 'user/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'user/create',
      }),
      onSendForm () {
        this.create().then(item => {
          this.$router.push({name: 'UserShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
