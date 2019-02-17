<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('label.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'label'" :is-loading="isLoading"></item-errors>

          <LabelForm

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
import LabelForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    LabelForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'label/item',
      errors: 'label/errors'
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
      getItem: 'label/getItem',
      reset: 'label/reset',
      update: 'label/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'LabelShow', params: {id: this.item['@id']}})
      }).catch(e => {})
    }
  }
}
</script>
