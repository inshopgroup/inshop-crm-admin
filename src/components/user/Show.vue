<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-show-errors :entity="'user'" :is-loading="isLoading"></item-show-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('user.tabs.general')}}</a></li>
          <li><a href="#tasks" data-toggle="tab" aria-expanded="false">{{$t('user.tabs.tasks')}}</a></li>
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
                  <td>{{$t('user.name')}}</td>
                  <td>{{ item['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.email')}}</td>
                  <td>{{ item['email'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.groups.name')}}</td>
                  <td>
                    <div v-for="group in item['groups']" :key="group['@id']">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      {{ group.name }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('user.language.name')}}</td>
                  <td v-if="item['language']">{{ item['language']['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="tasks">
            <tasks-table :tasks="item['tasks']"></tasks-table>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'User'" :path="'user'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'User'" :path="'user'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TasksTable from './TasksTable'
import ItemShowActions from '../layout/ItemShowActions'
import ItemShowErrors from '../layout/errors/ItemShowErrors'
import History from '../History'

export default {
  components: {History, ItemShowErrors, TasksTable, ItemShowActions},
  computed: {
    ...mapGetters({
      isLoading: 'user/show/isLoading',
      item: 'user/show/retrieved'
    })
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      del: 'user/del/del',
      reset: 'user/show/reset',
      retrieve: 'user/show/retrieve'
    }),

    deleteItem (item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.del(item).then(() => this.$router.push({ name: 'UserList' }))
      }
    }
  }
}
</script>
