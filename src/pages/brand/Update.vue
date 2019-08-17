<template>
  <is-main-template
    title="brand_edit"
    :title-params="{ entity: item && item.name }"
  >
    <brand-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
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
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'brand/getItem',
      update: 'brand/update',
      reset: 'brand/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'BrandShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
