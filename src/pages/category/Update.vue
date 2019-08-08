<template>
  <is-main-template
    title="category_edit"
    :title-params="{ entity: item && item.name }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'category/getItem',
      update: 'category/update'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'CategoryShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
