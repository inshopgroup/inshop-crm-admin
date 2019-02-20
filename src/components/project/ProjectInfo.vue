<template>
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
      <td>{{$t('project.name')}}</td>
      <td>{{ item['name'] }}</td>
    </tr>
    <tr>
      <td>{{$t('project.description')}}</td>
      <td>{{ item['description'] }}</td>
    </tr>
    <tr>
      <td>{{$t('project.type.name')}}</td>
      <td>
        <span v-if="item && item['type']">
          {{ item['type']['name'] }}
        </span>
      </td>
    </tr>
    <tr>
      <td>{{$t('project.status.name')}}</td>
      <td>
        <span v-if="item && item['type']">
          {{ item['status']['name'] }}
        </span>
      </td>
    </tr>
    <tr>
      <td>{{$t('project.client.name')}}</td>
      <td>
        <router-link v-if="item['client']" :to="{name: 'ClientShow', params: { id: item['client'].id }}">
          {{ item['client']['name'] }}
        </router-link>
      </td>
    </tr>
    <tr>
      <td>{{$t('project.createdAt')}}</td>
      <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
    </tr>
    <tr>
      <td>{{$t('project.updatedAt')}}</td>
      <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
    </tr>
    <tr>
      <td>{{$t('project.updatedBy')}}</td>
      <td>{{ item['updatedBy'] }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
  export default {
    name: 'ProjectInfo',
    props: {
      item: null,
    }
  }
</script>
