<template>
  <div>
    <section class="content-header">
      <h1>{{$t('user.add')}}</h1>
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

import UserForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ItemErrors,
    UserForm
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'user/item',
    isLoading: 'general/isLoading',
    errors: 'user/errors'
  }),
  methods: {
    ...mapActions({
      create: 'user/create',
      reset: 'user/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'UserShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
