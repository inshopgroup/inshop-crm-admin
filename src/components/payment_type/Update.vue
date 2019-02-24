<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('payment_type.edit', {entity: item && item.name}) }}</h1>
    </section>

    <PaymentTypeForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import PaymentTypeForm from './Form'

  export default {
    components: {
      PaymentTypeForm
    },
    computed: {
      ...mapGetters({
        item: 'payment_type/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'payment_type/getItem',
        update: 'payment_type/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'PaymentTypeShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
