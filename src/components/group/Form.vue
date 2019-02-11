<template>
<form @submit.prevent="handleSubmit(item)">

  <div class="form-group">
    <label for="group_name" class="form-control-label">{{$t('group.name')}}</label>
    <input
            id="group_name"
            v-model="item.name"
            :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
            type="text"
            placeholder=""
            @input="handleUpdateField('name', $event.target.value)">
    <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
  </div>

  <div class="form-group" v-for="module in modules">
    <h2>{{$t('module.' + module.name.replace(/\s+/g, '_').toLowerCase())}}</h2>

    <span class="form-group" v-for="role in module.roles" style="margin-left: 20px;">
          <input
                  :id="'group_role_' + role.role"
                  type="checkbox"
                  :name="'group_roles'"
                  :value="role['@id']"
                  v-model="item.roles"
          >
          <label :for="'group_role_' + role.role" class="form-control-label">{{$t('role.' + role.name.toLowerCase())}}</label>
        </span>

  </div>
  <div v-if="isInvalid('roles')" class="invalid-feedback">{{ violations.roles }}</div>

  <item-edit-actions :item="item" :entity="'Group'" :path="'group'"></item-edit-actions>
</form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemEditActions from '../layout/ItemEditActions'
import VuePassword from 'vue-password'

export default {
  components: {VuePassword, ItemEditActions },
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
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    modules () {
      return this.$store.getters['module/list/items'] || []
    },
  },

  created () {
    this.getModules('/modules?pagination[itemsPerPage]=500')
  },

  methods: {
    ...mapActions({
      getModules: 'module/list/default'
    }),
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  }
}
</script>
