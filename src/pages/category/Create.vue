<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('category_add') }}</h1>
    </section>

    <CategoryForm
      :handle-submit="onSendForm"
      :item="item"
    />
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
  methods: {
    ...mapActions({
      create: 'category/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'CategoryShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
