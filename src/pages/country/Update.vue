<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('country_edit', {entity: item && item.name}) }}</h1>
    </section>

    <CountryForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import CountryForm from './Form'

  export default {
    components: {
      CountryForm
    },
    computed: {
      ...mapGetters({
        item: 'country/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'country/getItem',
        update: 'country/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'CountryShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
