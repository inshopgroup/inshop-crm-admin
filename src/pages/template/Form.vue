<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'template'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'template.name'" @formUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'type'" :option-store="'template_type'" :label="'template.type.name'" @formUpdated="updateValue"></form-select>
          <form-file :axios="axios" :errors="errors" :item="item" property="files" formProperty="file" route="files" :multiple="true" label="files"></form-file>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Template'" :path="'template'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
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
      }
    },
    beforeDestroy () {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'template/errors'
      }),
      authHeader() {
        return 'Bearer ' + this.$store.state.auth.token
      },
    },
    methods: {
      ...mapActions({
        reset: 'template/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('template/TEMPLATE_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
