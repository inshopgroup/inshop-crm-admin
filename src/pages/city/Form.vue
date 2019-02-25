<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'city'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'city.name'" @fieldUpdated="updateValue"></form-input>
          <form-select-autocomplete :item="item" :errors="errors" :property="'country'" :option-property="'country'" :label="'city.country.name'" @fieldUpdated="updateValue"></form-select-autocomplete>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'City'" :path="'city'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormInput from "../../components/layout/form/FormInput";
  import FormSelectAutocomplete from "../../components/layout/form/FormSelectAutocomplete";
  import ItemErrors from "../../components/layout/errors/ItemErrors";

  export default {
    components: {
      ItemErrors,
      FormSelectAutocomplete,
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
        errors: 'city/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'city/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('city/CITY_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
