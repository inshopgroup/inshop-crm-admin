<template>
<div>
  <section class="content-header">
    <h1>{{ item && item['name'] }}</h1>
  </section>

  <section class="content">
    <item-errors :entity="'group'"></item-errors>

    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">
        <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('group.tabs.general')}}</a></li>
        <li><a href="#roles" data-toggle="tab" aria-expanded="false">{{$t('group.tabs.roles')}}</a></li>
        <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="general">
          <div v-if="item" class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th width="20%">{{$t('field')}}</th>
                <th>{{$t('value')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{$t('group.name')}}</td>
                <td>{{ item['name'] }}</td>
              </tr>
              <tr>
                <td>{{$t('group.createdAt')}}</td>
                <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
              </tr>
              <tr>
                <td>{{$t('group.updatedAt')}}</td>
                <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
              </tr>
              <tr>
                <td>{{$t('group.updatedBy')}}</td>
                <td>{{ item['updatedBy'] }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tab-pane" id="roles">
          <template v-for="module in modules">
          <h2>{{$t('module.' + module.name.replace(/\s+/g, '_').toLowerCase())}}</h2>
          <ul v-if="item && item['roles']">
            <li v-for="role in item['roles']" v-if="role.module.id === module.id">
              {{$t('role.' + role.name.toLowerCase())}}
            </li>
          </ul>
          </template>
        </div>
        <div class="tab-pane" id="history">
          <history :id="parseInt($route.params.id)" :entity="'Group'" :path="'group'"></history>
        </div>
      </div>
    </div>

    <item-show-actions :path="'group'" :item="item" :entity="'Group'"></item-show-actions>
  </section>
</div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemShowActions from '../../components/layout/ItemShowActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'
  import History from '../../components/History'

  export default {
    components: {History, ItemErrors, ItemShowActions},
    computed: {
      ...mapGetters({
        item: 'group/item'
      }),
      modules() {
        return this.$store.getters['module/items'] || []
      }
    },
    created() {
      this.getItem(this.$route.params.id)
      this.getModules('/modules?pagination[itemsPerPage]=500')
    },
    beforeDestroy() {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'group/getItem',
        reset: 'group/reset',
        getModules: 'module/list/default'
      })
    }
  }
</script>
