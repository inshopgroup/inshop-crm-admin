<template>
  <div>
    <section class="content-header">
      <h1>{{$t('category.add')}}</h1>
    </section>

    <CategoryForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
  import CategoryForm from './Form'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {
      CategoryForm
    },
    beforeDestroy() {
      this.reset()
    },
    computed: mapGetters({
      item: 'category/item',
    }),
    methods: {
      ...mapActions({
        create: 'category/create',
        reset: 'category/reset'
      }),
      onSendForm() {
        this.create().then(created => {
          this.$router.push({name: 'CategoryShow', params: {id: created.id}})
        }).catch(e => {})
      }
    }
  }
</script>
