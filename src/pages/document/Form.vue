<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'document'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" label="name" @formUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'client'" :option-store="'client'" label="clients" :multiple="true" @formUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'projects'" :option-store="'project'" label="projects" :multiple="true" @formUpdated="updateValue"></form-select>
          <form-file
              :axios="axios"
              :errors="errors"
              :item="item"
              property="files"
              formProperty="file"
              :route="route"
              :multiple="true"
              label="files"
              @formFileUploaded="formFileUploaded"
              @formFileDeleted="formFileDeleted"
          ></form-file>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Document'" :path="'document'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import ItemErrors from "../../components/layout/errors/ItemErrors";
  import axios from "../../interceptor";

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
    data() {
      return {
        axios: axios,
        route: process.env.VUE_APP_API_URL + '/files'
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
      formFileUploaded(file) {
        this.$store.commit('document/DOCUMENT_ADD_FILE', file)
      },
      formFileDeleted(value) {
        this.$store.commit('document/DOCUMENT_DELETE_FILE', value)
      },
    }
  }
</script>
