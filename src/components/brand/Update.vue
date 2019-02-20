<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('brand.edit', {entity: item && item.name}) }}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'brand'" :is-loading="isLoading"></item-errors>

          <BrandForm
            :handle-submit="onSendForm"
            :item="item"
            :errors="errors"
            />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BrandForm from './Form.vue'
import ItemErrors from '../layout/errors/ItemErrors'

export default {
  components: {
    ItemErrors,
    BrandForm
  },
  computed: {
    ...mapGetters({
      isLoading: 'general/isLoading',
      item: 'brand/item',
      errors: 'brand/errors'
    })
  },
  beforeDestroy () {
    this.reset()
  },
  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },
  methods: {
    ...mapActions({
      getItem: 'brand/getItem',
      reset: 'brand/reset',
      update: 'brand/update',
    }),
    onSendForm () {
      this.update().then(() => {
        this.$router.push({name: 'BrandShow', params: {id: this.item.id}})
      }).catch(e => {})
    }
  }
}
</script>
