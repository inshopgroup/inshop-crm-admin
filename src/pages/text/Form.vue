<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'text'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'title'" :label="'text.title'" @fieldUpdated="updateValue"></form-input>
          <form-textarea :item="item" :errors="errors" :property="'content'" :label="'text.content'" @fieldUpdated="updateValue"></form-textarea>
          <form-input :item="item" :errors="errors" :property="'seoTitle'" :label="'text.seoTitle'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'seoDescription'" :label="'text.seoDescription'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'seoKeywords'" :label="'text.seoKeywords'" @fieldUpdated="updateValue"></form-input>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Text'" :path="'text'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormInput from "../../components/layout/form/FormInput";
  import ItemErrors from "../../components/layout/errors/ItemErrors";
  import FormTextarea from "../../components/layout/form/FormTextarea";

  export default {
    components: {
      FormTextarea,
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
        errors: 'text/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'text/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('text/TEXT_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
