<template>
  <form @submit.prevent="handleSubmit(item)">

    <div class="form-group">
      <label
              for="user_name"
              class="form-control-label">{{$t('user.name')}}</label>
      <input
              id="user_name"
              v-model="item.name"
              :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('name', $event.target.value)">
      <div
              v-if="isInvalid('name')"
              class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label
        for="user_username"
        class="form-control-label">{{$t('user.email')}}</label>
      <input
        id="user_username"
        v-model="item.username"
        :class="['form-control', isInvalid('username') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('username', $event.target.value)">
      <div
        v-if="isInvalid('username')"
        class="invalid-feedback">{{ violations.username }}</div>
    </div>

    <div class="form-group" style="width: 400px;">
      <label for="user_password" class="form-control-label">{{$t('user.password')}}</label>

      <vue-password id="user_password"
              v-model="item.plainPassword"
              classes="form-control"
              :user-inputs="[item.username]"
      >
      </vue-password>

      <div v-if="isInvalid('email')" class="invalid-feedback">{{ violations.email }}</div>
    </div>

    <div class="form-group">
      <label for="user_groups" class="form-control-label">{{$t('user.groups.name')}}</label>

      <v-select multiple
                id="user_groups"
                v-model="item.groups"
                :options="groups"
                label="name"
      ></v-select>

      <div
        v-if="isInvalid('groups')"
        class="invalid-feedback">{{ violations.groups }}</div>
    </div>

    <div class="form-check" style="margin-bottom: 20px;">
      <input
              id="user_isActive"
              v-model="item.isActive"
              :class="['form-check-input', isInvalid('isActive') ? 'is-invalid' : '']"
              type="checkbox"
              placeholder=""
              @input="handleUpdateField('isActive', $event.target.value)">

      <label for="user_isActive" class="form-check-label">{{$t('user.isActive')}}</label>

      <div
              v-if="isInvalid('isActive')"
              class="invalid-feedback">{{ violations.isActive }}</div>
    </div>

    <div class="form-group">
      <label for="user_language" class="form-control-label">{{$t('user.language.name')}}</label>

      <v-select
              id="user_language"
              v-model="item.language"
              :options="languages"
              :class="['form-control-select2', isInvalid('language') ? 'is-invalid' : '']"
              label="name"
      ></v-select>

      <div v-if="isInvalid('language')" class="invalid-feedback">{{ violations.language }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'User'" :path="'user'"></item-edit-actions>
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

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    groups () {
      return this.$store.getters['group/list/items'] || []
    },

    languages () {
      return this.$store.getters['language/list/items'] || []
    },
  },

  created () {
    this.getGroups()
    this.getLanguages()
  },

  methods: {
    ...mapActions({
      getGroups: 'group/list/default',
      getLanguages: 'language/list/default',
    }),
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  }
}
</script>
