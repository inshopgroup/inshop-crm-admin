<template>
  <div>
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
  </div>
</template>

<script>
  import fecha from 'fecha'

  export default {
    name: 'ClientInfo',
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
