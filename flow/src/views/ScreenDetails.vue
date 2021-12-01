<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-if="loader"
        class="d-flex justify-content-center align-items-center vw-100 vh-100"
      >
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <template v-else>
      <div class="col-lg-6">
        <div class="img-container">
          <img class="image" :class="screenDetails.category" :src="screenDetails.img" alt="imgae" />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="details-container">
          <div class="card mb-1">
            <div class="card-body">
              <img class="profile-img" :src="require('../assets/uploads/profile.png')" alt="avatar" />
              <span>{{screenDetails.createdBy.name}}</span>
            </div>
          </div>
          <div class="card mb-1">
            <div class="card-body">
              <div class="mb-4">
              <h4>{{ screenDetails.name }}</h4>
              <p>{{ screenDetails.description }}</p>
              </div>
              <div>
                <div class="rating-item">
                  <span class="design rating-name">Design Thinking</span>
                  <Rating :grade="screenDetails.rating.design" :maxStars="5" :hasCounter="true" />
                </div>
                <div class="rating-item">
                  <span class="easy rating-name">Easy of use</span>
                  <Rating :grade="screenDetails.rating.easy" :maxStars="5" :hasCounter="true" />
                </div>
                <div class="rating-item">
                  <span class="visual rating-name">Aesthetics & Visual</span>
                  <Rating :grade="screenDetails.rating.visual" :maxStars="5" :hasCounter="true" />
                </div>
                <div class="rating-btn-block float-right">
                  <button class="rating-btn">
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i> Submit
                    your Rating
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-1">
            <div class="card-body add-comment">
             <img class="profile-img" src="../assets/uploads/profile.png" />
        <input type="text" class="form-control" placeholder="Add a comment"/>
        <button class="btn btn-primary">comment</button>
            </div>
          </div>
          <div class="p-lg-2">
              <p>{{screenDetails.comments && screenDetails.comments.length ? screenDetails.comments.length : 0}} Feedback</p>
              <template v-for="(comment,index) in screenDetails.comments" :key="index">
                <Comment :comment="comment"/>
              </template>
          </div>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
import screenData from "../assets/screens.json";
import Rating from "../components/Rating.vue";
import Comment from "../components/Comment.vue";
export default {
  name: "ScreenDetails",
  components: {
    Rating,
    Comment,
  },
  props: ["id"],
  data() {
    return {
      screenDetails: null,
      loader : true
    };
  },
  beforeMount() {
    //this.screenDetails = screenData.find((e) => e._id == this.id);
  },
  mounted() {
    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWww");
    this.$http
      .get("/screen/get/" + this.id)
      .then((e) => {
         let picture64Bit = btoa(String.fromCharCode(...new Uint8Array(e.data.img.data.data)));
         e.data.img = 'data:image/jpg;base64,' + picture64Bit
 
        // this.allScreens = data
        // this.screens = data.filter(e => e.category == 'Mobile')
        this.screenDetails = e.data;
        console.log(this.screenDetails)
        this.loader = false
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.image {
  width: 15rem;
}
.image.Mobile {
  width: 15rem;
}
.image.Web {
  width: 100%;
}
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  height: 30rem;
}
.card {
  border-radius: 0;
}
.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 1rem;
}
.details-container {
  margin: 1rem 0;
  padding: 1rem 0;
}
.rating-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  justify-content: space-between;
}

.rating-list li {
  float: right;
  color: #ddd;
  padding: 0px 5px;
}

.rating-list li:hover,
.rating-list li:hover ~ li {
  color: #ffd700;
}

.rating-list {
  display: inline-block;
  list-style: none;
  margin: 0;
}
.rating-name {
  color: white;
  font-size: 0.9rem;
  padding: 2px 5px;
  border-radius: 2px;
  font-weight: 500;
}
.design {
  background-color: #008450;
}
.easy {
  background-color: #ff8c01;
}
.visual {
  background-color: #fecd04;
}
.rating-btn {
  border: 1px solid black;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  background-color: white;
  color: grey;
}
.add-comment {
  display: flex;
  align-items: center;
  padding: 0.9rem;
}
.add-comment img {
  height: fit-content;
}
.add-comment input[type="text"] {
  flex: 2;
  margin-right: 1rem;
  padding: 0 10px;
  height: 1.875rem;
}
.add-comment button {
  border-radius: 16px;
}
@media (max-width: 400px) {
  .img-container {
    height: 14rem;
  }
}
</style>
