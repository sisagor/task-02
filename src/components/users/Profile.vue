<template>
  <Layout>
    <div class="container-fluid">
      <h1 class="mt-1">Profile</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item">
          <!--<a href="index.html"></a>-->
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="breadcrumb-item active">Profile</li>
      </ol>
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-user me-1"></i>
          Profile
        </div>
        <div class="card-body">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-12">
                <div class="card shadow-lg border-0 rounded-lg">
                  <div class="card-header"><h3 class=" font-weight-light my-4">Profile</h3>
                  </div>

                  <form @submit.prevent="update">

                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input required v-model="name" class="form-control" id="name" type="text"
                                   placeholder="Enter your name"/>
                            <label for="name">Name</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-floating">
                            <input required v-model="phone" class="form-control" id="phone" type="text"
                                   placeholder="Enter your phone"/>
                            <label for="phone">Phone</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input required v-model="email" class="form-control" id="email" type="text"
                                   placeholder="Enter your email"/>
                            <label for="email">Email</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-floating">
                            <input v-model="dob" class="form-control" id="dob" type="date"
                                   placeholder="Enter Date of birth"/>
                            <label for="dob">Date of birth</label>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <label for="gender">Gender</label>
                            <select v-model="gender" class="form-control" id="gender">
                              <option :selected="gender === '' ">Choose Gender</option>
                              <option value="Male" >Male</option>
                              <option value="Female">Female</option>

                            </select>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-floating">
                            <input v-model="address" class="form-control" id="address" type="text"
                                   placeholder="Enter address"/>
                            <label for="address">Address</label>
                          </div>
                        </div>
                      </div>

                  </div>

                    <div class="card-footer text-center py-3">
                      <div class="small">
                        <button type="submit" class="btn btn-primary btn-block">Update</button>
                      </div>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>

</template>


<script>

import Layout from "../layouts/Layout";
import axios from "axios";

export default {

  components: {
    Layout
  },

  data() {
    return {
      name: null,
      phone: null,
      email: null,
      dob: null,
      gender: null,
      address: null,
    }

  },

  methods: {

    update() {
      axios.post(window.config.baseUrl + 'user/profile/update/' + this.$session.get('id'),
        {
          name: this.name,
          phone: this.phone,
          email: this.email,
          dob: this.dob,
          gender: this.gender,
          address: this.address,
        },
      {
          headers: {
            'Authorization': 'Bearer '+this.$session.get('token')
          }
        }
      )
      .then(response => {
        if (response.data.status) {
          window.flash.success(this, 'Update success', 'Profile updated successfully')
        }
        else {
          window.flash.warning(this, 'Update failed', response.data.data.message)
        }
      })
      .catch(error => {
        window.flash.error(this, 'Update failed', 'Profile update failed')
      })
    },


  },

  beforeMount() {
    axios.get(window.config.baseUrl + 'user/profile/'+ this.$session.get('id'),
        {
          headers: {
            'Authorization': 'Bearer '+this.$session.get('token')
          }}
    )
    .then(response => {
       this.name = response.data.data.name,
       this.phone = response.data.data.phone,
       this.email = response.data.data.email,
       this.gender = response.data.data.gender,
       this.dob = response.data.data.dob,
       this.adddress = response.data.data.adddress
    })
    .catch(error => {
      window.flash.error(this, 'Failed', error.message)
    })

  }


}


</script>