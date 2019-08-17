<template>
  <is-main-template title="category_add">
    <category-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CategoryForm from './Form'

export default {
  components: {
    CategoryForm
  },
  computed: {
    ...mapGetters({
      item: 'category/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'category/create',
      reset: 'category/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'CategoryShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
