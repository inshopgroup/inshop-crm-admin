<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'user'"></item-errors>

      <div class="box box-primary">
        <div class="box-body">
          <form-input :item="item" :errors="errors" :property="'name'" label="name" @formUpdated="updateValue"></form-input>
          <form-input :item="item" :errors="errors" :property="'username'" label="email" @formUpdated="updateValue"></form-input>
<!--          <form-password :item="item" :errors="errors" :property="'plainPassword'" label="password" @formUpdated="updateValue"></form-password>-->
          <form-select :item="item" :errors="errors" :property="'groups'" :option-store="'group'" label="groups_name" :multiple="true" @formUpdated="updateValue"></form-select>
          <form-checkbox :item="item" :errors="errors" :property="'isActive'" label="isActive" @formUpdated="updateValue"></form-checkbox>
          <form-select :item="item" :errors="errors" :property="'language'" :option-store="'language'" label="language_name" @formUpdated="updateValue"></form-select>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'User'" :path="'user'"></item-edit-actions>
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
        errors: 'user/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'user/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('user/USER_UPDATE_ITEM', {[property]: value})
      }
    }
  }
</script>
