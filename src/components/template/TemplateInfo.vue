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
        <td>{{$t('template.name')}}</td>
        <td>{{ item['name'] }}</td>
      </tr>
      <tr>
        <td>{{$t('template.type.name')}}</td>
        <td>
          <div v-if="item['type']">
            {{ item['type']['name'] }}
          </div>
        </td>
      </tr>
      <tr>
        <td>{{$t('template.createdAt')}}</td>
        <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
      </tr>
      <tr>
        <td>{{$t('template.updatedAt')}}</td>
        <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
      </tr>
      <tr>
        <td>{{$t('template.updatedBy')}}</td>
        <td>{{ item['updatedBy'] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'TemplateInfo',
    props: {
      item: null,
    }
  }
</script>
