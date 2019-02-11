<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label for="company_name" class="form-control-label">{{$t('company.name')}}</label>
      <input
        id="company_name"
        v-model="item.name"
        :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('name', $event.target.value)">
      <div v-if="isInvalid('name')" class="invalid-feedback">{{ violations.name }}</div>
    </div>

    <div class="form-group">
      <label for="company_code" class="form-control-label">{{$t('company.code')}}</label>
      <input
        id="company_code"
        v-model.number="item.code"
        :class="['form-control', isInvalid('code') ? 'is-invalid' : '']"
        type="number"
        step="1">
      <div v-if="isInvalid('code')" class="invalid-feedback">{{ violations.code }}</div>
    </div>
    
    <div class="form-group">
      <label for="company_fullName" class="form-control-label">{{$t('company.fullName')}}</label>
      <input
        id="company_fullName"
        v-model="item.fullName"
        :class="['form-control', isInvalid('fullName') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('fullName', $event.target.value)">
      <div v-if="isInvalid('fullName')" class="invalid-feedback">{{ violations.fullName }}</div>
    </div>

    <div class="form-group">
      <label for="company_contactPerson" class="form-control-label">{{$t('company.contactPerson')}}</label>
      <input
              id="company_contactPerson"
              v-model="item.contactPerson"
              :class="['form-control', isInvalid('contactPerson') ? 'is-invalid' : '']"
              type="text"
              placeholder=""
              @input="handleUpdateField('contactPerson', $event.target.value)">
      <div v-if="isInvalid('contactPerson')" class="invalid-feedback">{{ violations.contactPerson }}</div>
    </div>

    <div class="form-group">
      <label for="company_description" class="form-control-label">{{$t('company.description')}}</label>
      <textarea
              id="company_description"
              v-model="item.description"
              :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
              placeholder=""
              @input="handleUpdateField('description', $event.target.value)"
      ></textarea>
      <div v-if="isInvalid('description')" class="invalid-feedback">{{ violations.description }}</div>
    </div>

    <div class="form-group">
      <label for="company_comment" class="form-control-label">{{$t('company.comment')}}</label>
      <textarea
              id="company_comment"
              v-model="item.comment"
              :class="['form-control', isInvalid('comment') ? 'is-invalid' : '']"
              placeholder=""
              @input="handleUpdateField('comment', $event.target.value)"
      ></textarea>
      <div v-if="isInvalid('comment')" class="invalid-feedback">{{ violations.comment }}</div>
    </div>
    
    <div class="form-group">
      <label for="company_bankName" class="form-control-label">{{$t('company.bankName')}}</label>
      <input
        id="company_bankName"
        v-model="item.bankName"
        :class="['form-control', isInvalid('bankName') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('bankName', $event.target.value)">
      <div v-if="isInvalid('bankName')" class="invalid-feedback">{{ violations.bankName }}</div>
    </div>
    
    <div class="form-group">
      <label for="company_bankAccountNumber" class="form-control-label">{{$t('company.bankAccountNumber')}}</label>
      <input
        id="company_bankAccountNumber"
        v-model="item.bankAccountNumber"
        :class="['form-control', isInvalid('bankAccountNumber') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('bankAccountNumber', $event.target.value)">
      <div v-if="isInvalid('bankAccountNumber')" class="invalid-feedback">{{ violations.bankAccountNumber }}</div>
    </div>
    
    <div class="form-group">
      <label
        for="company_krs"
        class="form-control-label">{{$t('company.krs')}}</label>
      <input
        id="company_krs"
        v-model="item.krs"
        :class="['form-control', isInvalid('krs') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('krs', $event.target.value)">
      <div
        v-if="isInvalid('krs')"
        class="invalid-feedback">{{ violations.krs }}</div>
    </div>
    <div class="form-group">
      <label
        for="company_nip"
        class="form-control-label">{{$t('company.nip')}}</label>
      <input
        id="company_nip"
        v-model="item.nip"
        :class="['form-control', isInvalid('nip') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('nip', $event.target.value)">
      <div
        v-if="isInvalid('nip')"
        class="invalid-feedback">{{ violations.nip }}</div>
    </div>

    <div class="form-group">
      <label
        for="company_clients"
        class="form-control-label">{{$t('company.clients')}}</label>


      <v-select multiple
                id="company_clients"
                v-model="item.clients"
                :options="clients"
                label="name"
                @search="loadClients"
      ></v-select>

      <div
        v-if="isInvalid('clients')"
        class="invalid-feedback">{{ violations.clients }}</div>
    </div>

    <div class="form-group">
      <label
        for="company_labels"
        class="form-control-label">{{$t('company.labels.id')}}</label>

      <v-select multiple
                id="company_labels"
                v-model="item.labels"
                :options="labels"
                label="name"
      ></v-select>

      <div
        v-if="isInvalid('labels')"
        class="invalid-feedback">{{ violations.labels}}</div>
    </div>


    <div class="form-check" style="margin-bottom: 20px;">
      <input
              id="company_isVat"
              v-model="item.isVat"
              :class="['form-check-input', isInvalid('isVat') ? 'is-invalid' : '']"
              type="checkbox"
              placeholder=""
              @input="handleUpdateField('isVat', $event.target.value)">

      <label for="company_isVat" class="form-check-label">{{$t('company.isVat')}}</label>

      <div
              v-if="isInvalid('isVat')"
              class="invalid-feedback">{{ violations.isVat }}</div>
    </div>

    <div class="form-group">
      <label for="company_vatComment" class="form-control-label">{{$t('company.vatComment')}}</label>
      <textarea
              id="company_vatComment"
              v-model="item.vatComment"
              :class="['form-control', isInvalid('vatComment') ? 'is-invalid' : '']"
              placeholder=""
              @input="handleUpdateField('vatComment', $event.target.value)">
      </textarea>
      <div v-if="isInvalid('vatComment')" class="invalid-feedback">{{ violations.vatComment }}</div>
    </div>

    <item-edit-actions :item="item" :entity="'Company'" :path="'company'"></item-edit-actions>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import lodash from 'lodash'
import ItemEditActions from '../layout/ItemEditActions'

export default {
  components: { ItemEditActions },
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

  mounted () {
    this.getLabels()
  },

  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    },

    ...mapGetters({
      clients: 'client/list/items',
      labels: 'label/list/items',
    }),
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    },
    ...mapActions({
      getClients: 'client/list/default',
      getLabels: 'label/list/default'
    }),

    loadClients (keyword, loading) {
      loading(true);

      this.search(loading, keyword, this);
    },

    search: _.debounce((loading, keyword, vm) => {
      vm.getClients('/clients?name=' + keyword)
      loading(false);
    }, 350)
  }
}
</script>
