<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('edit', {entity: item && item.name}) }}</h1>
    </section>

    <VatForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import VatForm from './Form'

  export default {
    components: {
      VatForm
    },
    computed: {
      ...mapGetters({
        item: 'vat/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'vat/getItem',
        update: 'vat/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'VatShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
