<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('product.add') }}</h1>
    </section>

    <ProductForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ProductForm from './Form'

  export default {
    components: {
      ProductForm,
    },
    computed: {
      ...mapGetters({
        item: 'product/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'product/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'ProductShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
