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
            <td>{{$t('code')}}</td>
            <td>{{ item['code'] }}</td>
          </tr>
          <tr>
            <td>{{$t('name')}}</td>
            <td>{{ item['name'] }}</td>
          </tr>
          <tr>
            <td>{{$t('fullName')}}</td>
            <td>{{ item['fullName'] }}</td>
          </tr>
          <tr>
            <td>{{$t('contactPerson')}}</td>
            <td>{{ item['contactPerson'] }}</td>
          </tr>
          <tr>
            <td>{{$t('description')}}</td>
            <td>{{ item['description'] }}</td>
          </tr>
          <tr>
            <td>{{$t('comment')}}</td>
            <td>{{ item['comment'] }}</td>
          </tr>
          <tr>
            <td>{{$t('bankName')}}</td>
            <td>{{ item['bankName'] }}</td>
          </tr>
          <tr>
            <td>{{$t('bankAccountNumber')}}</td>
            <td>{{ item['bankAccountNumber'] }}</td>
          </tr>
          <tr>
            <td>{{$t('krs')}}</td>
            <td>{{ item['krs'] }}</td>
          </tr>
          <tr>
            <td>{{$t('nip')}}</td>
            <td>{{ item['nip'] }}</td>
          </tr>
          <tr>
            <td>{{$t('isVat')}}</td>
            <td>{{ item['isVat'] }}</td>
          </tr>
          <tr>
            <td>{{$t('labels_id')}}</td>
            <td>
              <template v-for="label in item.labels">
                <span class="label label-primary">{{ label.name }}</span>
              </template>
            </td>
          </tr>
          <tr>
            <td>{{$t('vatComment')}}</td>
            <td>{{ item['vatComment'] }}</td>
          </tr>
          <tr>
            <td>{{$t('createdAt')}}</td>
            <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
          </tr>
          <tr>
            <td>{{$t('updatedAt')}}</td>
            <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
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
  export default {
    name: 'CompanyInfo',
    props: {
      item: null
    }
  }
</script>
