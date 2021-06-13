<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
         <FlashMessage position="top"></FlashMessage>
          <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
          <div class="card-body">
            <form @submit.prevent="login" method="post">
              <div class="form-floating mb-3">
                <input v-model="email" class="form-control" id="inputEmail" type="email" placeholder="Enter email" />
                <label for="inputEmail">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input v-model="password" class="form-control" id="inputPassword" type="password" placeholder="Password" />
                <label for="inputPassword">Password</label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
              </div>
              <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                <a class="small" href="#">Forgot Password?</a>
                <button class="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <div class="small">
              <router-link to="/register">Need an account? Sign up!</router-link>
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
      email: null,
      password: null,
    }
  },

  methods : {

    login(){
        axios.post(window.config.baseUrl + 'login',
          {
            email:this.email, password:this.password
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
              title: 'Login success.',
              message: 'You have logged in successfully.',
            });

            this.$router.push('/dashboard');
          }
          else
          {
            this.flashMessage.error({
              title: 'Login failed.',
              message: response.data.data.message,
            });
          }

        })
        .catch(error => {
          this.flashMessage.error({
            title: 'Login failed.',
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
