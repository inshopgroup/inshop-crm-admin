<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('city_edit', {entity: item && item.name}) }}</h1>
    </section>
    <CityForm :handle-submit="onSendForm" :item="item"/>
  </div>
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
  methods: {
    ...mapActions({
      getItem: 'city/getItem',
      update: 'city/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'CityShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
