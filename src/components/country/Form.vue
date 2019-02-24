<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'country'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'country.name'" @fieldUpdated="updateValue"></form-input>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Country'" :path="'country'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../layout/ItemEditActions'
  import FormInput from "../layout/form/FormInput";
  import ItemErrors from "../layout/errors/ItemErrors";

  export default {
    components: {
      ItemErrors,
      FormInput,
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
      }
    },
    beforeDestroy () {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'country/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'country/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('country/COUNTRY_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
