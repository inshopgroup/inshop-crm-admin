<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('brand_edit', {entity: item && item.name}) }}</h1>
    </section>
    <BrandForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BrandForm from './Form'

export default {
  components: {
    BrandForm
  },
  computed: {
    ...mapGetters({
      item: 'brand/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'brand/getItem',
      update: 'brand/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'BrandShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
