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
            <td>{{$t('company.code')}}</td>
            <td>{{ item['code'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.name')}}</td>
            <td>{{ item['name'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.fullName')}}</td>
            <td>{{ item['fullName'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.contactPerson')}}</td>
            <td>{{ item['contactPerson'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.description')}}</td>
            <td>{{ item['description'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.comment')}}</td>
            <td>{{ item['comment'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.bankName')}}</td>
            <td>{{ item['bankName'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.bankAccountNumber')}}</td>
            <td>{{ item['bankAccountNumber'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.krs')}}</td>
            <td>{{ item['krs'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.nip')}}</td>
            <td>{{ item['nip'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.isVat')}}</td>
            <td>{{ item['isVat'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.vatComment')}}</td>
            <td>{{ item['vatComment'] }}</td>
          </tr>
          <tr>
            <td>{{$t('company.createdAt')}}</td>
            <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
          </tr>
          <tr>
            <td>{{$t('company.updatedAt')}}</td>
            <td>{{ moment(item['updateAt']).format('DD-MM-YYYY HH:mm') }}</td>
          </tr>
          <tr>
            <td>{{$t('company.updatedBy')}}</td>
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
