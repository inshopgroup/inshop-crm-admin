<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <button
          type="submit"
          class="btn btn-success"
        >
          {{ $t('submit') }}
        </button>
      </div>
      <div class="col-md-6">
        <div class="pull-right btn-toolbar">
          <button
            v-if="btnBackToList && isGranted(role_list)"
            type="button"
            class="btn btn-info"
            @click="backToList()"
          >
            {{ $t('back_to_list') }}
          </button>
          <button
            v-if="item.id && isGranted(role_show)"
            type="button"
            class="btn btn-primary"
            @click="showItem()"
          >
            {{ $t('show') }}
          </button>
          <button
            v-if="item.id && isGranted(role_delete)"
            type="button"
            class="btn btn-danger"
            @click="deleteItem()"
          >
            {{ $t('delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemEditActions',
  props: {
    item: {
      type: Object,
      required: true
    },
    entity: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    },
    btnBackToList: {
      type: Boolean,
      default: true
    },
    btnEdit: {
      type: Boolean,
      default: true
    },
    btnDelete: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    role_show () {
      return 'ROLE_' + this.path.toUpperCase() + '_SHOW'
    },
    role_list () {
      return 'ROLE_' + this.path.toUpperCase() + '_LIST'
    },
    role_delete () {
      return 'ROLE_' + this.path.toUpperCase() + '_DELETE'
    }
  },
  methods: {
    backToList () {
      this.$router.push({ name: this.entity + 'List' })
    },
    showItem () {
      this.$router.push({ name: this.entity + 'Show', params: { id: this.item.id } })
    },
    deleteItem () {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.$store.dispatch(this.path + '/remove', this.item)
          .then(() => this.$router.push({ name: this.entity + 'List' }))
      }
    }
  }
}
</script>
