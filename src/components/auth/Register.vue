<template>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <div class="card shadow-lg border-0 rounded-lg mt-5">
            <FlashMessage position="top"></FlashMessage>
            <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <input required v-model="name" class="form-control" id="name" type="text" placeholder="Enter your name" />
                      <label for="name">Name</label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating">
                      <input required v-model="phone" class="form-control" id="phone" type="text" placeholder="Enter your phone" />
                      <label for="phone">Phone</label>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <input required v-model="email" class="form-control" id="email" type="text" placeholder="Enter your email" />
                      <label for="email">Email</label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating">
                      <input v-model="dob" class="form-control" id="dob" type="date" placeholder="Enter Date of birth" />
                      <label for="dob">Date of birth</label>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <label for="gender">Gender</label>
                      <select v-model="gender" class="form-control" id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-floating">
                      <input v-model="address" class="form-control" id="address" type="text" placeholder="Enter address" />
                      <label for="address">Address</label>
                    </div>
                  </div>
                </div>
<!--                  <div class="form-floating mb-3">
                  <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                  <label for="inputEmail">Email address</label>
                </div>-->
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <input v-model="password" class="form-control" id="inputPassword" type="password" placeholder="Create a password" />
                      <label for="inputPassword">Password</label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating mb-3 mb-md-0">
                      <input v-model="password_confirmation" class="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                      <label for="inputPasswordConfirm">Confirm Password</label>
                    </div>
                  </div>
                </div>
                <div class="mt-4 mb-0">
                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-block" >Create Account</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer text-center py-3">
              <div class="small">
                <router-link to="/login">Have an account? Go to login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>


<script>

import axios from "axios";

export default {

  data(){
    return {

      name : null,
      phone : null,
      email : null,
      dob : null,
      gender : null,
      address : null,
      password:null,
      password_confirmation:null,

    }

  },

  methods : {

    register(){
        axios.post(window.config.baseUrl + 'register',
            {
              name:this.name, phone:this.phone, email:this.email, dob:this.dob, gender:this.gender, address:this.address, password:this.password, password_confirmation:this.password_confirmation
        })
        .then(response => {

          if (response.data.status){
            this.$session.start();
            this.$session.set('loggedIn', true);
            this.$session.set('id', response.data.data.id);
            this.$session.set('name', response.data.data.name);
            this.$session.set('email', response.data.data.email);
            this.$session.set('token', response.data.data.token);

            this.flashMessage.success({
              title: 'Registration success.',
              message: 'You have logged in successfully.',
            });

            this.$router.push('/dashboard');

          }
          else
          {
            this.flashMessage.error({
              title: 'Registration Failed.',
              message: response.data.data.message,
            });
          }

        })
        .catch(error => {
          this.flashMessage.error({
            title: 'Registration Failed.',
            message: error.message,
          });
        })
    },


  },

  beforeCreate(){
    if (this.$session.exists()){
      this.$router.push('/dashboard');
    }
  }




}



</script>