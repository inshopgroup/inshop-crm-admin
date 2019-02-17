<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('group.edit', {entity: item && item.name}) }}</h1>
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
import { mapActions, mapGetters } from 'vuex'
import GroupForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    GroupForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'group/item',
      errors: 'group/errors'
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
      getItem: 'group/getItem',
      reset: 'group/reset',
      update: 'group/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'GroupShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
