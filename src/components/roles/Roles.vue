<template>
  <Layout>

    <div class="container-fluid px-4">
    <h1 class="mt-4">Users</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item">
      <!--<a href="index.html"></a>-->
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active">Users</li>
    </ol>
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Users
      </div>
      <div class="card-body">

        <grid
            :auto-width="autoWidth"
            :cols="cols"
            :language="language"
            :pagination="pagination"
            :rows="rows"
            :search="search"
            :sort="sort"
            :width="width"
        ></grid>

      </div>
    </div>
  </div>

  </Layout>
</template>


<script>

import Grid from 'gridjs-vue'
import axios from "axios";
import Layout from "../layouts/Layout";

export default {
  name: 'MyTable',
  components: {
    Grid,
    Layout
  },
  data() {
    return {
        // REQUIRED:
        // An array containing strings of column headers
          cols: ['Name', 'Phone', 'Email', 'Gender', 'Date of Birth'],
          //Rows
          rows:null,

          // OPTIONAL:
          // Boolean to automatically set table width
          autoWidth: true,
          // Localization dictionary object
          language: {},
          // Localization dictionary object
          /*server: true,*/
          // Boolean or pagination settings object
          pagination: true,
          // Boolean or search settings object
          search: true,
          // Boolean or sort settings object
          sort: true,
          // String with name of theme or 'none' to disable
          theme: 'mermaid',
          // String with css width value
          width: '100%',
    }
  },

  beforeMount () {
    axios.get(window.config.baseUrl + 'users', {
      headers: {
        'Authorization': 'Bearer '+this.$session.get('token')
      }
    })
      .then(response => {
        console.log(response.data.data)
        this.rows = response.data.data.map(user =>
            [
                user.data.name, user.data.phone, user.data.email, user.data.gender, user.data.dob
            ]);

      }).catch(error => {

        this.falshMessage.error({
          title : 'Error',
          message : error.message,
        });
    })


  }
}

</script>
