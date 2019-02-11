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



  computed: mapGetters([
    'isLoading',
    'created',
    'violations'
  ]),

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    created: function (created) {
      if (!created) {
        return
      }

      this.$router.push({ name: 'ProjectUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create'
    ]),

    onSendForm () {
      this.create(this.item)
    },

    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    }
  }
}
</script>
