<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'task'"></item-errors>

      <div class="nav-tabs-custom" v-if="item">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('task.tabs.general')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th width="20%">{{$t('field')}}</th>
                <th>{{$t('value')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{$t('task.name')}}</td>
                <td>{{ item['name'] }}</td>
              </tr>
              <tr>
                <td>{{$t('task.description')}}</td>
                <td>{{ item['description'] }}</td>
              </tr>
              <tr>
                <td><b>{{$t('task.status.name')}}</b></td>
                <td><b v-if="item.status">{{ item.status.name }}</b></td>
              </tr>
              <tr>
                <td><b>{{$t('task.deadline')}}</b></td>
                <td><b>{{ moment(item['deadline']).format('DD-MM-YYYY') }}</b></td>
              </tr>
              <tr>
                <td>{{$t('task.project.name')}}</td>
                <td>
                  <router-link v-if="item['project']" :to="{name: 'ProjectShow', params: { id: item['project'].id }}">
                    {{ item['project']['name'] }}
                  </router-link>
                </td>
              </tr>
              <tr>
                <td>{{$t('task.assignee.name')}}</td>
                <td>
                  <router-link v-if="item['assignee']" :to="{name: 'UserShow', params: { id: item['assignee'].id }}">
                    {{ item['assignee']['name'] }}
                  </router-link>
                </td>
              </tr>
              <tr>
                <td>{{$t('task.timeEstimated')}}</td>
                <td>{{ item['timeEstimated'] }}</td>
              </tr>
              <tr>
                <td>{{$t('task.timeSpent')}}</td>
                <td>{{ item['timeSpent'] }}</td>
              </tr>
              <tr>
                <td>{{$t('task.createdAt')}}</td>
                <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
              </tr>
              <tr>
                <td>{{$t('task.updatedAt')}}</td>
                <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
              </tr>
              <tr>
                <td>{{$t('task.updatedBy')}}</td>
                <td>{{ item['updatedBy'] }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'Task'" :path="'task'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Task'" :path="'task'"></item-show-actions>
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
    computed: mapGetters({
      item: 'task/item'
    }),
    created() {
      this.getItem(this.$route.params.id)
    },
    beforeDestroy() {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'task/getItem',
        reset: 'task/reset'
      })
    }
  }
</script>
