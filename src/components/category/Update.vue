<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('category.edit', {entity: item && item.name}) }}</h1>
    </section>

    <CategoryForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CategoryForm from './Form.vue'

export default {
  components: {
    CategoryForm
  },
  computed: {
    ...mapGetters({
      item: 'category/item',
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
