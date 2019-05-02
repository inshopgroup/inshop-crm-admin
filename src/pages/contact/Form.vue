<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'contact'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'value'" label="value" @formUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'contactType'" :option-store="'contact_type'" label="contactType_name" @formUpdated="updateValue"></form-select>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Contact'" :path="'contact'" v-if="showActions"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import ItemErrors from "../../components/layout/errors/ItemErrors";

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
