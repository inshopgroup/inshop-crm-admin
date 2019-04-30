<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'city'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="$t('name')" @formUpdated="updateValue"></form-input>
          <form-select-autocomplete :item="item" :errors="errors" :property="'country'" :store-path="'country'" :label="$t('country_name')" @formUpdated="updateValue"></form-select-autocomplete>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'City'" :path="'city'"></item-edit-actions>
    
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'

  export default {
    components: {
      ItemErrors,
      ItemEditActions
    },
    props: {
      handleSubmit: {
        type: Function,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
    },
    beforeDestroy () {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'city/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'city/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('city/CITY_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
