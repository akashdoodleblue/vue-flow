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
            <img
              class="image"
              :class="screenDetails.category"
              :src="screenDetails.img"
              alt="imgae"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="details-container">
            <div class="card mb-1">
              <div class="card-body">
                <img
                  class="profile-img"
                  :src="require('../assets/uploads/profile.png')"
                  alt="avatar"
                />
                <span>{{ screenDetails.createdBy.name }}</span>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-body">
                <div class="mb-4">
                  <h4>{{ screenDetails.name }}</h4>
                  <p>{{ screenDetails.description }}</p>
                </div>
                <div class="">
                  <div class="d-flex align-items-center">
                    <div class="rating-box mr-3">
                      <div class="circle">
                        <span class="circle-number">{{
                          screenDetails.rating.design
                        }}</span>
                        <svg
                          height="40"
                          width="40"
                          :style="`stroke-dashoffset: ${
                            251 - screenDetails.rating.design * 18
                          }`"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="14"
                            stroke="#008450"
                            stroke-width="2"
                            fill="#eeedeb"
                          />
                        </svg>
                      </div>
                      <div class="circle">
                        <span class="circle-number">{{
                          screenDetails.rating.easy
                        }}</span>
                        <svg
                          height="40"
                          width="40"
                          :style="`stroke-dashoffset: ${
                            251 - screenDetails.rating.easy * 18
                          }`"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="14"
                            stroke="#ff8c01"
                            stroke-width="2"
                            fill="#eeedeb"
                          />
                        </svg>
                      </div>
                      <div class="circle">
                        <span class="circle-number">{{
                          screenDetails.rating.visual
                        }}</span>
                        <svg
                          height="40"
                          width="40"
                          :style="`stroke-dashoffset: ${
                            251 - screenDetails.rating.visual * 18
                          }`"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="14"
                            stroke="#fecd04"
                            stroke-width="2"
                            fill="#eeedeb"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="total-rating">
                      <div class="t-circle mr-2">
                        {{ screenDetails.totalRating }}
                      </div>
                      <div class="text">
                        {{ screenDetails.numOfRating }} <br />
                        total rating
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <!-- <div class='circle'>
    <div class='arc'></div>
</div> -->
                    <div class="rating-item">
                      <span class="design rating-name">Design Thinking</span>
                      <Rating
                        :grade="
                          screenDetails.userRating
                            ? screenDetails.userRating.design
                            : 0
                        "
                        :maxStars="5"
                        :hasCounter="true"
                        :type="'design'"
                        @starChanged="starChanged"
                      />
                    </div>
                    <div class="rating-item">
                      <span class="easy rating-name">Easy of use</span>
                      <Rating
                        :grade="
                          screenDetails.userRating
                            ? screenDetails.userRating.easy
                            : 0
                        "
                        :maxStars="5"
                        :hasCounter="true"
                        :type="'easy'"
                        @starChanged="starChanged"
                      />
                    </div>
                    <div class="rating-item">
                      <span class="visual rating-name"
                        >Aesthetics & Visual</span
                      >
                      <Rating
                        :grade="
                          screenDetails.userRating
                            ? screenDetails.userRating.visual
                            : 0
                        "
                        :maxStars="5"
                        :hasCounter="true"
                        :type="'visual'"
                        @starChanged="starChanged"
                      />
                    </div>
                    <div class="rating-btn-block float-right">
                      <button
                        :disabled="ratingDisabled"
                        class="rating-btn"
                        :class="ratingDisabled ? 'disabled' : ''"
                        @click="addRating"
                      >
                        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                        Submit your Rating
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-body add-comment">
                <img class="profile-img" src="../assets/uploads/profile.png" />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Add a comment"
                  v-model="commentText"
                />
                <button class="btn btn-primary" @click="addComment">
                  comment
                </button>
              </div>
            </div>
            <div class="p-lg-2">
              <p>
                {{
                  screenDetails.comments && screenDetails.comments.length
                    ? screenDetails.comments.length
                    : 0
                }}
                Feedback
              </p>
              <template
                v-for="(comment, index) in screenDetails.comments"
                :key="index"
              >
                <Comment
                  :comment="comment"
                  @addChildComment="addChildComment"
                />
              </template>
              <div class="p-2" v-if="getMoreScreens.length > 3">
                <h5 class="font-weight-light mb-4">More <span class="blue-text">Screens</span></h5>
                <div class="d-flex justify-content-around">
                  <div
                    class="more-img"
                    v-for="screen in getMoreScreens"
                    :key="screen"
                  >
                    <img :src="screen.img" />
                  </div>
                </div>
              </div>
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
import { getUser } from "../services/user";
export default {
  name: "ScreenDetails",
  components: {
    Rating,
    Comment,
  },
  props: {
    id: {
      type: String,
    },
    moreScreens: {
      type: String
    },
  },
  data() {
    return {
      screenDetails: null,
      loader: true,
      commentText: "",
      user: getUser(),
      ratingDisabled: true,
      rating: {},
      all: [],
    };
  },
  computed:{
    getMoreScreens(){
       try{
         return JSON.parse(this.moreScreens)
     }catch(e){
       return []
     }
    }
  },
  beforeMount() {
    //this.screenDetails = screenData.find((e) => e._id == this.id);
  },
  mounted() {
    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWww", JSON.parse(this.moreScreens));
    // this.all = this.moreScreens.map((e) => {
    //   return JSON.parse(e);
    // });
    //console.log("SSSSSSSSSSSSSSSSSSSSC", this.moreScreens);
    // this.all = this.moreScreens;
     console.log(this.all);
    this.$http
      .get("/screen/get/" + this.id)
      .then((e) => {
        let picture64Bit = btoa(
          String.fromCharCode(...new Uint8Array(e.data.img.data.data))
        );
        e.data.img = "data:image/jpg;base64," + picture64Bit;

        // this.allScreens = data
        // this.screens = data.filter(e => e.category == 'Mobile')
        this.screenDetails = e.data;
        console.log(this.screenDetails);
        this.loader = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    addComment() {
      if (this.commentText) {
        let body = {
          text: this.commentText,
          user: this.user._id,
          screen: this.screenDetails._id,
        };
        this.$http
          .post(`/comment/add`, body)
          .then((res) => {
            console.log(res);
            let data = res.data.data;
            let picture64Bit = btoa(
              String.fromCharCode(...new Uint8Array(data.img.data.data))
            );
            data.img = "data:image/jpg;base64," + picture64Bit;
            this.screenDetails = data;
            this.commentText = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    addChildComment(data) {
      if (data.text) {
        let body = {
          text: data.text,
          parentComment: data.parentId,
          user: this.user.name,
          screen: this.screenDetails._id,
        };
        // console.log(body)
        this.$http
          .post(`/comment/child-add`, body)
          .then((res) => {
            console.log(res);
            let data = res.data.data;
            let picture64Bit = btoa(
              String.fromCharCode(...new Uint8Array(data.img.data.data))
            );
            data.img = "data:image/jpg;base64," + picture64Bit;
            this.screenDetails = data;
            this.commentText = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    starChanged(data) {
      this.rating[data.type] = data.star;
      this.ratingDisabled = false;
    },
    addRating() {
      console.log(this.rating);
      let body = {
        ...this.rating,
        user: this.user._id,
        screen: this.screenDetails._id,
      };
      this.$http
        .post(`/rating/add`, body)
        .then((res) => {
          console.log(res);
          let data = res.data.data;
          let picture64Bit = btoa(
            String.fromCharCode(...new Uint8Array(data.img.data.data))
          );
          data.img = "data:image/jpg;base64," + picture64Bit;
          this.screenDetails = data;
          this.commentText = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
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

.rating-btn.disabled {
  background: gainsboro;
  color: darkgrey;
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
.rating-box {
  display: flex;
}

.circle {
  position: relative;
}
.circle-number {
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  z-index: 9;
}
.total-rating {
  display: flex;
  align-items: center;
}
.t-circle {
  color: white;
  line-height: 3rem;
  text-align: center;
  width: 3rem;
  height: 3rem;
  background-color: orange;
  border-radius: 50%;
}
.total-rating .text {
  color: grey;
  font-size: 0.85rem;
}

svg {
  transform: rotate(-90deg);
  stroke-dasharray: 251; /* (2PI * 40px) */
  /* stroke-dashoffset: 251; */
}

.more-img {
  width: 10rem;
  height: 17rem;
  display: flex;
    align-items: center;
    background-color: lightgray;
    border-radius: 6px;
}
.more-img img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.blue-text{
  border-bottom: #007bff 3px solid;
  color : #007bff;
  padding-bottom : 3px
}

@media (max-width: 400px) {
  .img-container {
    height: 14rem;
  }
}
</style>
