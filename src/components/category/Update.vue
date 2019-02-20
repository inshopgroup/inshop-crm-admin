<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('category.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'category'" :is-loading="isLoading"></item-errors>

          <CategoryForm
            :handle-submit="onSendForm"
            :item="item"
            :errors="errors" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CategoryForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    CategoryForm
  },
  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      item: 'category/item',
      errors: 'category/errors'
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
      getItem: 'category/getItem',
      reset: 'category/reset',
      update: 'category/update',
    }),
    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'CategoryShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
