<template>
  <div class="container-fluid hidden-print">
    <div class="row">
      <div class="col-md-6">
      </div>
      <div class="col-md-6">
        <div class="pull-right">
          <button type="button" class="btn btn-info" @click="backToList(item)" v-if="btnBackToList && isGranted(role_list)">{{$t('back_to_list')}}</button>
          <button type="button" class="btn btn-primary" @click="editItem(item)" v-if="btnEdit && isGranted(role_update)">{{$t('edit')}}</button>
          <button type="button" class="btn btn-danger" @click="deleteItem(item)" v-if="btnDelete && isGranted(role_delete)">{{$t('delete')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemShowActions',
  props: {
    item: {},
    entity: null,
    path: null,
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
    role_update () {
      return 'ROLE_' + this.path.toUpperCase() + '_UPDATE'
    },
    role_list () {
      return 'ROLE_' + this.path.toUpperCase() + '_LIST'
    },
    role_delete () {
      return 'ROLE_' + this.path.toUpperCase() + '_DELETE'
    }
  },
  methods: {
    backToList (item) {
      this.$router.push({ name: this.entity + 'List' })
    },
    editItem (item) {
      this.$router.push({ name: this.entity + 'Update', params: { id: this.item.id } })
    },
    deleteItem (item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.$store.dispatch(this.path + '/remove', item)
          .then(() => this.$router.push({ name: this.entity + 'List' }))
      }
    }
  }
}
</script>
