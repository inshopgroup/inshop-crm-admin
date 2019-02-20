<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('template.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'template'" :is-loading="isLoading"></item-errors>

          <TemplateForm

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
import TemplateForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    TemplateForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'template/item',
      errors: 'template/errors'
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
      getItem: 'template/getItem',
      reset: 'template/reset',
      update: 'template/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'TemplateShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
