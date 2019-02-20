<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('user.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'user'" :is-loading="isLoading"></item-errors>

          <UserForm

            :handle-submit="onSendForm"

            :item="item"
            :errors="errors"
            />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    UserForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'user/item',
      errors: 'user/errors'
    })
  },



  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      getItem: 'user/getItem',
      reset: 'user/reset',
      update: 'user/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'UserShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
