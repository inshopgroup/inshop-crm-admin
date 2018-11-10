<template>
<div v-if="item" class="table-responsive">
  <table class="table table-striped table-hover">
    <tbody>
    <tr>
      <td>{{$t('document.name')}}</td>
      <td>{{ item['name'] }}</td>
    </tr>
    <tr>
      <td>{{$t('document.client')}}</td>
      <td>
        <router-link v-if="item['client']" :to="{name: 'ClientShow', params: { id: item['client']['@id'] }}">
          {{ item['client']['name'] }}
        </router-link>
      </td>
    </tr>
    <tr>
      <td>{{$t('document.createdAt')}}</td>
      <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
    </tr>
    <tr>
      <td>{{$t('document.updateAt')}}</td>
      <td>{{ moment(item['updateAt']).format('DD-MM-YYYY HH:mm') }}</td>
    </tr>
    <tr>
      <td>{{$t('document.updatedBy')}}</td>
      <td>{{ item['updatedBy'] }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
  export default {
    name: 'DocumentInfo',
    props: {
      item: null,
    }
  }
</script>
