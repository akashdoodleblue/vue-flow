<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-bg">
      <div class="logo">
        <!-- <router-link :to="{ name: 'Home' }"> -->
        <h3 class="text-white" @click="navigateHome()">Flow</h3>
        <!-- </router-link> -->
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
       <div class="navbar-category  ml-lg-4" v-if="$route.name == 'Home'">
        <i
          @click="activate(1)"
          :class="{ 'active-tab': active_tab == 1 }"
          class="fa fa-mobile left"
          aria-hidden="true"
        ></i>
        <i
          @click="activate(2)"
          :class="{ 'active-tab': active_tab == 2 }"
          class="fa fa-desktop right"
          aria-hidden="true"
        ></i>
      </div>
     <ul class="navbar-nav ml-auto"> 
      <li class="nav-item"> 
        <a class="nav-link">
      <button
        data-toggle="modal"
        data-target="#exampleModal"
        class="btn btn-primary mr-2 my-2 my-sm-0"
        type="button"
      >
        Create a screen
      </button>
      </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
      <button
        @click="logout"
        class="btn btn-outline-primary my-2 my-sm-0"
        type="button"
      >
        Logout
      </button>
      </a>
      </li>
     </ul>
      <!-- Modal -->
      <div
        class="modal fade show modal-open"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
        style=" padding-right : 16px "
        
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add new screen</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                id="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form >
                <div class="form-group">
                  <label>Name</label>
                  <!-- <div>{{v$.screenForm}}</div> -->
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="exampleInputEmail1"
                    v-model="v$.screenForm.name.$model"
                    :class="{ 'is-invalid': v$.screenForm.name.$error }"
                  />
                  <div
                    class="invalid-feedback"
                    v-for="(error, index) of v$.screenForm.name.$errors"
                    :key="index"
                  >
                    <span>{{ error.$message }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    type="email"
                    class="form-control form-control-sm"
                    id="exampleInputEmail1"
                    v-model="v$.screenForm.description.$model"
                    :class="{ 'is-invalid': v$.screenForm.description.$error }"
                  />
                  <div
                    class="invalid-feedback"
                    v-for="(error, index) of v$.screenForm.description.$errors"
                    :key="index"
                  >
                    <span>{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Categories</label>
                  <select
                    id="inputState"
                    class="form-control"
                    v-model="v$.screenForm.category.$model"
                    :class="{ 'is-invalid': v$.screenForm.category.$error }"
                  >
                    <option value="" selected>Select Category</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Web">Web</option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-for="(error, index) of v$.screenForm.category.$errors"
                    :key="index"
                  >
                    <span>{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group" v-if="!url">
                  <div class="dropbox">
                    <input
                      type="file"
                      multiple
                      :name="uploadFieldName"
                      :disabled="isSaving"
                      @change="
                        filesChange($event.target.name, $event.target.files);
                        fileCount = $event.target.files.length;
                      "
                      accept="image/*"
                      class="input-file"
                    />
                    <p v-if="isInitial">
                      Drag your file(s) here to begin<br />
                      or click to browse
                    </p>
                    <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
                  </div>

                  <!--SUCCESS-->
                  <!-- <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles" :key="item">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div> -->
                </div>
                <div v-if="url">
                  <p>
                    <a href="javascript:void(0)" @click="reset()"
                      >Upload again</a
                    >
                  </p>
                   <p v-if="message">
                    {{message}}
                  </p>
                  <div class="preview">
                    <img v-if="url" :src="url" />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" @click.prevent="handleSubmit" class="btn btn-primary" >Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {getUser }from '../services/user'
import { upload } from "../services/file-upload";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "Navbar",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      screenForm: {
        name: "",
        description: "",
        category: "",
        myImage: "",
      },
      message : '',
      screenFormData : null,
      url: null,
      active_tab: 1,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "myImage",
    };
  },
  validations() {
    return {
      screenForm: {
        name: {
          required,
        },
        description: {
          required,
        },
        category: {
          required,
        },
      },
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {
    activate(el) {
      this.active_tab = el;
      this.$bus.$emit("change_category", el == 1 ? "Mobile" : "Web");
    },
    navigateHome() {
      this.$router.push("/home");
      setTimeout(() => {
        this.$bus.$emit(
          "change_category",
          this.active_tab == 1 ? "Mobile" : "Web"
        );
      }, 0);
    },
    logout() {
        //localStorage.removeItem('login')
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
      this.url = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      console.log(formData);
      upload(formData)
        .then((x) => {
          console.log("WHUUUUUUUUUUUUUUUUUUuuuu")
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
          document.getElementById('close').click();
          this.$bus.$emit("screen_upload");
        })
        .catch((err) => {
          console.log(err)
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      this.message = ''
       if (!fileList.length) return;
      this.url = URL.createObjectURL(fileList[0]);
      const allowedTypes = ["image/jpeg","image/jpg","image/png"]
       const file = fileList[0]
      console.log(file)
      if(!allowedTypes.includes(file.type)){
        this.message = "Only images are allowed"
        return
      }
      if(file.size > 2000000){
        this.message = "Too large, max size allowed is 2mb"
        return
      }
      this.screenForm.myImage = file
      //this.save(formData);
    },
    handleSubmit(){
       const formData = new FormData();
       let user = getUser()
       console.log(this.screenForm)
      formData.append(this.uploadFieldName, this.screenForm.myImage, this.screenForm.myImage.name);
      formData.append('name', this.screenForm.name);
      formData.append('description', this.screenForm.description);
      formData.append('category', this.screenForm.category);
      formData.append('createdBy', user._id)
      console.log("AFTER",formData)
      console.log(this.screenForm)
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  },
};
</script>

<style scoped>
.navbar-bg {
  background-color: #2e2d2d;
}
/* .navbar-left {
  display: flex;
  align-items: center;
} */
.navbar-category {
  display: flex;
  align-items: inherit;
}
.navbar-category i {
  color: #585757;
  background-color: #383737;
}
.logo:hover {
  cursor: pointer;
}
.navbar-category i:hover {
  cursor: pointer;
}
.navbar-category .left {
  font-size: 27px;
  border-radius: 10px 0 0 10px;
  padding: 4px 18px 4px 22px;
}
.navbar-category .right {
  font-size: 18px;
  border-radius: 0 10px 10px 0;
  padding: 8px 16px;
}
.active-tab {
  background-color: grey !important;
  color: white !important;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview img {
  max-width: 100%;
  max-height: 300px;
}
</style>
