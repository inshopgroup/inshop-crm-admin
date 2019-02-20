<template>
  <div>
    <section class="content-header">
      <h1>{{$t('group.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'group'" :is-loading="isLoading"></item-errors>

          <GroupForm
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

import GroupForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ItemErrors,
    GroupForm
  },
  beforeDestroy() {
    this.reset()
  },

  data () {
    return {
      item: {
        roles: []
      }
    }
  },

  computed: mapGetters({
    item: 'group/item',
    isLoading: 'general/isLoading',
    errors: 'group/errors'
  }),

  methods: {
    ...mapActions({
      create: 'group/create',
      reset: 'group/reset'
    }),

    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'GroupShow', params: {id: created['id']}})
      }).catch(e => {})
    }
  }
}
</script>
