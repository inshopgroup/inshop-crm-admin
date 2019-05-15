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
      <td>{{$t('name')}}</td>
      <td>{{ item['name'] }}</td>
    </tr>
    <tr>
      <td>{{$t('description')}}</td>
      <td>{{ item['description'] }}</td>
    </tr>
    <tr>
      <td>{{$t('type_name')}}</td>
      <td>
        <span v-if="item && item['type']">
          {{ item['type']['name'] }}
        </span>
      </td>
    </tr>
    <tr>
      <td>{{$t('status_name')}}</td>
      <td>
        <span v-if="item && item['type']">
          {{ item['status']['name'] }}
        </span>
      </td>
    </tr>
    <tr>
      <td>{{$t('client_name')}}</td>
      <td>
        <router-link v-if="item['client']" :to="{name: 'ClientShow', params: { id: item['client'].id }}">
          {{ item['client']['name'] }}
        </router-link>
      </td>
    </tr>
    <tr>
      <td>{{$t('createdAt')}}</td>
      <td>{{ fecha.format(fecha.parse(item.createdAt, 'YYYY-MM-DDTHH:mm:ss'), 'DD-MM-YYYY HH:mm') }}</td>
    </tr>
    <tr>
      <td>{{$t('updatedAt')}}</td>
      <td>{{ fecha.format(fecha.parse(item.updatedAt, 'YYYY-MM-DDTHH:mm:ss'), 'DD-MM-YYYY HH:mm') }}</td>
    </tr>
    <tr>
      <td>{{$t('updatedBy')}}</td>
      <td>{{ item['updatedBy'] }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
  import fecha from 'fecha'

  export default {
    name: 'ProjectInfo',
    data () {
      return {
        fecha: fecha,
      }
    },
    props: {
      item: null,
    }
  }
</script>
