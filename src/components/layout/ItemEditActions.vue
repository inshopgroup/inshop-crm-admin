<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <button type="submit" class="btn btn-success">{{$t('submit')}}</button>
      </div>
      <div class="col-md-6">
        <div class="pull-right">
          <button type="button" class="btn btn-info" @click="backToList(item)" v-if="btnBackToList && isGranted(role_list)">{{$t('back_to_list')}}</button>
          <button type="button" class="btn btn-primary" @click="showItem(item)" v-if="item.id && isGranted(role_show)">{{$t('show')}}</button>
          <button type="button" class="btn btn-danger" @click="deleteItem(item)" v-if="item.id && isGranted(role_delete)">{{$t('delete')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemEditActions',
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
    backToList (item) {
      this.$router.push({ name: this.entity + 'List' })
    },
    showItem (item) {
      this.$router.push({ name: this.entity + 'Show', params: { id: this.item.id } })
    },
    deleteItem (item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.$store.dispatch(this.path + '/del/del', item)
          .then(() => this.$router.push({ name: this.entity + 'List' }))
      }
    }
  }
}
</script>
