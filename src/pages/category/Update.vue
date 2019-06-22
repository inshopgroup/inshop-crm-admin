<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('category_edit', { entity: item && item.name }) }}</h1>
    </section>
    <CategoryForm :handle-submit="onSendForm" :item="item" />
  </div>
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
