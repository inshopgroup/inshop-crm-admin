<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('city_add') }}</h1>
    </section>
    <CityForm :handle-submit="onSendForm" :item="item" />
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
  methods: {
    ...mapActions({
      create: 'city/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'CityShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
