<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('language.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'language'" :is-loading="isLoading"></item-errors>

          <LanguageForm

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
import LanguageForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    LanguageForm
  },



  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',

      item: 'language/item',
      errors: 'language/errors'
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
      getItem: 'language/getItem',
      reset: 'language/reset',
      update: 'language/update',
    }),

    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'LanguageShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
