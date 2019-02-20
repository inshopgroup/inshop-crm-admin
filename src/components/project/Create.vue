<template>
  <div>
    <section class="content-header">
      <h1>{{$t('project.add')}}</h1>
    </section>

    <item-errors :entity="'template'" :is-loading="isLoading"></item-errors>

    <ProjectForm
      :handle-submit="onSendForm"

      :item="item"
      :errors="errors"

    />
  </div>
</template>

<script>

import ProjectForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ItemErrors,
    ProjectForm
  },
  beforeDestroy() {
    this.reset()
  },
  computed: mapGetters({
    item: 'project/item',
    isLoading: 'general/isLoading',
    errors: 'project/errors'
  }),
  methods: {
    ...mapActions({
      create: 'project/create',
      reset: 'project/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'ProjectShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
