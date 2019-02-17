<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('document.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'document'" :is-loading="isLoading"></item-errors>

          <DocumentForm

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
import DocumentForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    DocumentForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'document/item',
      errors: 'document/errors'
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
      getItem: 'document/getItem',
      reset: 'document/reset',
      update: 'document/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'DocumentShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
