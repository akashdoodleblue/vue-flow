<template>
  <div class="global-container">
    <div class="card login-form">
      <div class="card-body">
        <template v-if="!registerActive">
          <h3 class="card-title text-center">Log in</h3>
          <div class="card-text">
            <form @submit.prevent="handleLoginSubmit">
               <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </p>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control form-control-sm"
                  id="exampleInputEmail1"
                  v-model.lazy="v$.loginForm.email.$model"
                  :class="{ 'is-invalid': v$.loginForm.email.$error }"
                />
                <div
                  class="invalid-feedback"
                  v-for="(error, index) of v$.loginForm.email.$errors"
                  :key="index"
                >
                  <span>{{ error.$message }}</span>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <!-- <a href="#" style="float:right;font-size:12px;">Forgot password?</a> -->
                <input
                  type="password"
                  class="form-control form-control-sm"
                  id="exampleInputPassword1"
                  v-model="v$.loginForm.password.$model"
                  :class="{ 'is-invalid': v$.loginForm.password.$error }"
                />
                <div
                  class="invalid-feedback"
                  v-for="(error, index) of v$.loginForm.email.$errors"
                  :key="index"
                >
                  <span>{{ error.$message }}</span>
                </div>
              </div>
              <button :disabled="v$.loginForm.$invalid" type="submit" class="btn btn-primary btn-block">
                Log in
              </button>

              <div class="sign-up">
                Don't have an account?
                <a href="#" @click="registerActive = !registerActive"
                  >Create One</a
                >
              </div>
            </form>
          </div>
        </template>
        <template v-else>
          <h3 class="card-title text-center">Sign up</h3>
          <div class="card-text">
            <form @submit.prevent="handleSignupSubmit">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  :class="{ 'is-invalid': v$.signupForm.name.$error }"
                  id="name"
                  aria-describedby="name"
                  v-model="v$.signupForm.name.$model"
                />
                <div
                  class="invalid-feedback"
                  v-for="(error, index) of v$.signupForm.name.$errors"
                  :key="index"
                >
                  <span>{{ error.$message }}</span>
                </div>
              </div>
              <div class="form-group">
                <label for="singup-email">Email address</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  :class="{ 'is-invalid': v$.signupForm.email.$error }"
                  id="singup-email"
                  v-model.lazy="v$.signupForm.email.$model"
                />
                <div
                  class="invalid-feedback"
                  v-for="(error, index) of v$.signupForm.email.$errors"
                  :key="index"
                >
                  <span>{{ error.$message }}</span>
                </div>
              </div>
              <div class="form-group">
                <label for="singup-password">Password</label>
                <input
                  type="password"
                  class="form-control form-control-sm"
                  id="singup-password"
                  v-model="v$.signupForm.password.$model"
                  :class="{ 'is-invalid': v$.signupForm.password.$error }"
                />
                <div
                  class="invalid-feedback"
                  v-for="(error, index) of v$.signupForm.password.$errors"
                  :key="index"
                >
                  <span>{{ error.$message }}</span>
                </div>
              </div>
              <div class="form-group">
                <label for="singup-phone">Phone no.</label>
                <input
                  type="number"
                  class="form-control form-control-sm no-arrow"
                  id="singup-phone"
                  v-model="v$.signupForm.phoneno.$model"
                  :class="{ 'is-invalid': v$.signupForm.phoneno.$error }"
                />
                <div
                  class="invalid-feedback"
                  v-for="(error, index) of v$.signupForm.phoneno.$errors"
                  :key="index"
                >
                  <span>{{ error.$message }}</span>
                </div>
              </div>

              <button :disabled="v$.signupForm.$invalid" type="submit" class="btn btn-primary btn-block">
                Sign up
              </button>

              <div class="sign-up">
                Already have an account?
                <a href="#" @click="registerActive = !registerActive"
                  >Sign in here</a
                >
              </div>
            </form>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import userData from "../assets/users.json";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "Login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      signupForm: {
        name: "",
        email: "",
        password: "",
        phoneno: "",
      },
      loginForm: {
        email: "",
        password: "",
      },
      errors: [],
      userData : userData,
      registerActive: false,
    };
  },
  validations() {
    return {
      signupForm: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(6),
        },
        phoneno: {
          required,
          phone_validation: {
            $validator: this.validPhone,
            $message: "Invalid Phone number",
          },
        },
      },
      loginForm: {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      },
    };
  },
  methods: {
    validPhone(phone) {
      console.log(phone);
      let validNamePattern = new RegExp("^[6-9][0-9]{9}$");
      if (validNamePattern.test(phone)) {
        return true;
      }
      return false;
    },
    async handleSignupSubmit() {
      console.log(this.signupForm);
      if (this.v$.signupForm.$invalid) {
        console.log("NOOOOOOOOOOOOOOOOOoo");
        return;
      }else{
      try {
        let response = await this.$http.post("/user/register", this.signupForm);
        console.log(response);
        
        let token = response.data.token;
        
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user",JSON.stringify(user))
          this.$router.push("home");
          console.log("Success", "Registration Was successful", "success");
        } else {
          console.log("Error", "Something Went Wrong", "Error");
        }
      } catch (err) {
        console.log(err)
        let error = err.response;
        if (error.status == 409) {
          console.log("Error", error.data.message, "error");
        } else {
          console.log("Error", error.data.err.message, "error");
        }
      }
    }
    

    },
    async handleLoginSubmit(){
      console.log(this.loginForm)
      console.log(this.v$.loginForm)
      if (this.v$.loginForm.$invalid) {
        console.log("NOOOOOOOOOOOOOOOOOoo");
        return;
      }
      // const { email , password } = this.loginForm
      // let user =  userData.find(e => e.email == email)
      // console.log(user)
      // if(user && user.password == password){
      //   localStorage.setItem('login', true)
      //   this.$router.push('home')
      // }else{
      //   this.errors.push('Invalid email or password')
      // }
      try {
        let response = await this.$http.post("/user/login", this.loginForm);
        let token = response.data.token;
        let user = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user",JSON.stringify(user))
        if (token) {
          console.log("Success", "Login Successful", "Error");
          this.$router.push("/home");
        }
      } catch (err) {
        console.log("Error", "Something Went Wrong", "error");
        console.log(err.response);
        this.errors = []
        this.errors.push(err.response.data.error)
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.global-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

form {
  padding-top: 10px;
  font-size: 14px;
  margin-top: 30px;
}

.card-title {
  font-weight: 300;
}

.btn {
  font-size: 14px;
  margin-top: 20px;
}

.login-form {
  width: 330px;
  margin: 20px;
}

.sign-up {
  text-align: center;
  padding: 20px 0 0;
}

.alert {
  margin-bottom: -30px;
  font-size: 13px;
  margin-top: 20px;
}
.no-arrow {
  -moz-appearance: textfield;
}
.no-arrow::-webkit-inner-spin-button {
  display: none;
}
</style>
