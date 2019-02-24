<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'contact'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'value'" :label="'contact.value'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'contactType'" :option-property="'contact_type'" :label="'contact.contactType.name'" @fieldUpdated="updateValue"></form-select>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Contact'" :path="'contact'" v-if="showActions"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../layout/ItemEditActions'
  import FormSelect from "../layout/form/FormSelect";
  import FormInput from "../layout/form/FormInput";
  import ItemErrors from "../layout/errors/ItemErrors";

  export default {
    components: {
      ItemErrors,
      FormInput,
      FormSelect,
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
      showActions: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    beforeDestroy () {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'contact/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'contact/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('contact/CONTACT_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
