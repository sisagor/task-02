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

        <b-row>
          <b-col md="3" offset-md="9">
            <b-form-input v-model="filter" type="search" placeholder="search here">
            </b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <b-table show-empty striped hover
                     :items="items"
                     :fields="fields"
                     :filter="filter"
                     :per-page="perPage"
                     :current-page="currentPage"
            ></b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
          </b-col>
        </b-row>

      </div>
    </div>
  </div>

  </Layout>
</template>


<script>

import axios from "axios";
import Layout from "../layouts/Layout";

export default {
  name: 'Users',
  components: {
    Layout
  },
  data() {
    return {
      items: [],
      filter: null,
      fields: ['name', 'phone', 'email', 'gender', 'dob', 'address'],
      currentPage: 1,
      perPage: window.config.perPage,
      rows: 0
    }
  },

  created () {
   this.users()
  },

  methods:{
     users(){
       axios.get(window.config.baseUrl + 'users', {
          headers: {
            'Authorization': 'Bearer '+this.$session.get('token')
          }
        })
        .then(response => {

          this.rows = parseInt(response.data.data.length, 10);
          this.items = response.data.data;

        })
        .catch(error => {
          window.flash.warning(this, 'Data fetching error', error.message)
        })
    },

  },


}

</script>
