<template>
<div class="modal fade" id="modal-not-done-tasks">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t('notification_deadline')}}</h4>
      </div>
      <div class="modal-body form-horizontal">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th style="width: 75px;">{{$t('id')}}</th>
            <th>{{$t('name')}}</th>
            <th>{{$t('name')}}</th>
            <th>{{$t('client')}}</th>
            <th>{{$t('assignee.name')}}</th>
            <th>{{$t('status.name')}}</th>
            <th>{{$t('deadline')}}</th>
            <!--<th>{{$t('createdAt')}}</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>
              <a href="#" @click.prtask="goto(task)">
                {{ task.id }}
              </a>
            </td>
            <td>
              <a href="#" @click.prtask="goto(task)">
                {{ task['name'] }}
              </a>
            </td>
            <td>
              <a href="#" @click.prtask="goto(task)" v-if="task && task['assignee']">
                {{ task['project']['name'] }}
              </a>
            </td>
            <td>
              <a href="#" @click.prtask="goto(task)">
                {{ task['project']['client']['name'] }}
              </a>
            </td>
            <td>
              <a href="#" @click.prtask="goto(task)">
                {{ task['assignee']['name'] }}
              </a>
            </td>
            <td>
              <a href="#" @click.prtask="goto(task)">
                {{ task['status']['name'] }}
              </a>
            </td>
            <td>
              <a href="#" @click.prtask="goto(task)">
                {{ moment(task['deadline']).format('DD-MM-YYYY') }}
              </a>
            </td>
            <!--<td>-->
              <!--<a href="#" @click.prtask="goto(task)">-->
                <!--{{ moment(task['createdAt']).format('DD-MM-YYYY HH:mm') }}-->
              <!--</a>-->
            <!--</td>-->
          </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{$t('close')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ModalNotDoneTasks',
  data () {
    return {}
  },
  props: {
    tasks: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    goto (task) {
      $('#modal-not-done-tasks').modal('hide')
      this.$router.push({ name: 'TaskShow', params: { id: task.id } })
    }
  }
}
</script>
