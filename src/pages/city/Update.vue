<template>
  <is-main-template
    title="city_edit"
    :title-params="{ entity: item && item.name }"
  >
    <city-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CityForm from './Form'

export default {
  components: {
    CityForm
  },
  computed: {
    ...mapGetters({
      item: 'city/item'
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
      getItem: 'city/getItem',
      update: 'city/update',
      reset: 'city/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'CityShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
