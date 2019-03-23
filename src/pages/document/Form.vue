<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'document'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'document.name'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'client'" :option-property="'client'" :label="'document.clients'" :multiple="true" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'projects'" :option-property="'project'" :label="'document.projects'" :multiple="true" @fieldUpdated="updateValue"></form-select>
          <form-files :item="item" itemProperty="files" formProperty="file" route="files" :multiple="true" label="files"></form-files>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Document'" :path="'document'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormInput from "../../components/layout/form/FormInput";
  import FormSelect from "../../components/layout/form/FormSelect";
  import ItemErrors from "../../components/layout/errors/ItemErrors";
  import FormFiles from "../../components/layout/form/FormFiles";

  export default {
    components: {
      FormFiles,
      ItemErrors,
      FormSelect,
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
    beforeDestroy() {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'document/errors'
      }),
      authHeader() {
        return 'Bearer ' + this.$store.state.auth.token
      },
    },
    methods: {
      ...mapActions({
        reset: 'document/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('document/DOCUMENT_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
