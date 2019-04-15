<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'project'"></item-errors>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('project.tabs.general')}}</h3>
        </div>
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" :label="'project.name'" @fieldUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'description'" :label="'project.description'" @fieldUpdated="updateValue"></form-input>
          <form-select :item="item" :errors="errors" :property="'type'" :option-property="'project_type'" :label="'project.type.name'" @fieldUpdated="updateValue"></form-select>
          <form-select :item="item" :errors="errors" :property="'status'" :option-property="'project_status'" :label="'project.status.name'" @fieldUpdated="updateValue"></form-select>
          <form-select-autocomplete :item="item" :errors="errors" :property="'client'" :option-property="'client'" :label="'project.client.name'" @fieldUpdated="updateValue"></form-select-autocomplete>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'Project'" :path="'project'"></item-edit-actions>
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
        errors: 'project/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'project/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('project/PROJECT_UPDATE_ITEM', {[property]: value})
      },
    }
  }
</script>
