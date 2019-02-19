<template>

<div class="modal fade" id="modal-project-edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{modalEdit.title}}</h4>
      </div>
      <div class="modal-body form-horizontal">

        <div :class="[{ 'has-error': isInvalid('name') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('project.name')}}:</label>
          <div class="col-sm-10">
            <input
                    id="project_name"
                    v-model="modalEdit.item.name"
                    :class="['form-control', isInvalid('name') ? 'is-invalid' : '']"
                    type="text"
                    placeholder="">
            <span class="help-block">{{ violations.name }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('description') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('project.description')}}:</label>
          <div class="col-sm-10">
            <input
                    id="project_description"
                    v-model="modalEdit.item.description"
                    :class="['form-control', isInvalid('description') ? 'is-invalid' : '']"
                    type="text"
                    placeholder="">
            <span class="help-block">{{ violations.description }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('type') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('project.type.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="project_type"
                    v-model="modalEdit.item.type"
                    :options="projectTypes"
                    :class="['form-control-select2', isInvalid('type') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>
            <span class="help-block">{{ violations.type }}</span>
          </div>
        </div>

        <div :class="[{ 'has-error': isInvalid('status') }, 'form-group']">
          <label class="col-sm-2 control-label">{{$t('project.status.name')}}:</label>
          <div class="col-sm-10">
            <v-select
                    id="project_status"
                    v-model="modalEdit.item.status"
                    :options="projectStatuses"
                    :class="['form-control-select2', isInvalid('status') ? 'is-invalid' : '']"
                    label="name"
            ></v-select>
            <span class="help-block">{{ violations.status }}</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{$t('close')}}</button>
        <button type="submit" class="btn btn-primary" @click="save(modalEdit.item)">{{$t('save')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from '../../interceptor'

export default {
  name: 'ModalProjectForm',
  data () {
    return {
      errors: {}
    }
  },
  props: {
    modalEdit: {
      title: '',
      item: {},
    },
  },

  computed: {
    violations () {
      return this.errors || {}
    },

    projectStatuses () {
      return this.$store.getters['project_status/list/items'] || []
    },

    projectTypes () {
      return this.$store.getters['project_type/list/items'] || []
    },
  },

  mounted () {
    this.getProjectStatuses()
    this.getProjectTypes()
  },

  methods: {
    ...mapActions({
      getProjectStatuses: 'project_status/list/default',
      getProjectTypes: 'project_type/list/default'
    }),

    save (item) {
      axios.request({
        url: this.modalEdit.url,
        method: this.modalEdit.method,
        data: item
      })
        .then(response => {
          this.$toastr.s(this.$t('project.saved', {project: item.value}), this.$t('saved'))
          $('#modal-project-edit').modal('hide')
          this.$emit('projectCreated', item)
        })
        .catch(e => {
          if (e.response && e.response.data) {
            let data = e.response.data

            if (data.violations) {
              const errors = {}

              data.violations.map(violation => {
                Object.assign(errors, { [violation.propertyPath]: violation.message })
              })

              this.errors = errors
            } else {
              this.$toastr.e(data['hydra:description'], data['hydra:title']);
            }
          } else {
            this.$toastr.e(e.message, this.$t('error_occurred'))
          }
        })
    },

    updateValue(property, value) {
this.$store.commit('address/ADDRESS_UPDATE_ITEM', {[property]: value})
},
  }
}
</script>
