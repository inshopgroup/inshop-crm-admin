<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('payment_type.add') }}</h1>
    </section>

    <PaymentTypeForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import PaymentTypeForm from './Form'

  export default {
    components: {
      PaymentTypeForm,
    },
    computed: {
      ...mapGetters({
        item: 'payment_type/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'payment_type/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'PaymentTypeShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
