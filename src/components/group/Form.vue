<template>
<form @submit.prevent="handleSubmit(item)">
  <form-input :item="item" :errors="errors" :property="'name'" :label="'group.name'" @fieldUpdated="updateValue"></form-input>

  <div class="form-group" v-for="module in modules">
    <h2>{{$t('module.' + module.name.replace(/\s+/g, '_').toLowerCase())}}</h2>

    <template v-for="role in module.roles" style="margin-left: 20px;">
      <form-checkbox :item="item" :errors="errors" :property="'roles'" :label="'role.' + role.name.toLowerCase()" @fieldUpdated="updateValue"></form-checkbox>
    </template>
  </div>

  <item-edit-actions :item="item" :entity="'Group'" :path="'group'"></item-edit-actions>
</form>
</template>

<script>
import { mapActions } from 'vuex'
import ItemEditActions from '../layout/ItemEditActions'
import VuePassword from 'vue-password'
import FormInput from "../layout/form/FormInput";
import FormCheckbox from "../layout/form/FormCheckbox";

export default {
  components: {FormCheckbox, FormInput, VuePassword, ItemEditActions },
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    modules () {
      return this.$store.getters['module/items'] || []
    },
  },
  created () {
    this.getModules('/modules?pagination[itemsPerPage]=500')
  },
  methods: {
    ...mapActions({
      getModules: 'module/getItems'
    }),
    updateValue(property, value) {
      this.$store.commit('group/GROUP_UPDATE_ITEM', {[property]: value})
    }
  }
}
</script>
