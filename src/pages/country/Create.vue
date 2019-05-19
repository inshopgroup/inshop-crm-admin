<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('country_add') }}</h1>
    </section>
    <CountryForm
      :handle-submit="onSendForm"
      :item="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CountryForm from './Form'

export default {
  components: {
    CountryForm
  },
  computed: {
    ...mapGetters({
      item: 'country/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'country/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'CountryShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
