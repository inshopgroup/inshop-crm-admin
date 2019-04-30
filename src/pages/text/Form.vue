<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'text'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'title'" :label="$t('text_title')" @formUpdated="updateValue"></form-input>
          <form-textarea :item="item" :errors="errors" :property="'content'" :label="$t('content')" @formUpdated="updateValue"></form-textarea>
          <form-input :item="item" :errors="errors" :property="'seoTitle'" :label="$t('seoTitle')" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'seoDescription'" :label="$t('seoDescription')" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'seoKeywords'" :label="$t('seoKeywords')" @formUpdated="updateValue"></form-input>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Text'" :path="'text'"></item-edit-actions>
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
