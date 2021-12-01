<template>
  <div class="card mb-2">
    <div class="card-body comment">
      <div class="main-comment">
        <div>
          <img class="profile-img" :src="getImgUrl(comment.user.avatar)" />
        </div>
        <div>
          <div>{{ comment.user.name }}</div>
          <p class="text">{{ comment.msg }}</p>
        </div>
      </div>
      <div class="child-comment">
        <img class="profile-img" src="../assets/uploads/profile.png" />
        <input type="text" class="form-control" placeholder="Add a comment" />
        <button class="btn btn-primary btn-sm">comment</button>
      </div>
      <div class="reply-comment" :class="showComments ? 'show-replies' : ''">
        <div class="box">
          <span style="font-weight: 500">{{ comment.child[0].name }} : </span>
          <span class="ml-2">{{ comment.child[0].msg }}</span>
        </div>
        <template v-if="showComments">
          <div v-for="reply in getMoreComments" :key="reply">
            <div class="box mt-1">
              <span style="font-weight: 500"
                >{{ reply.name }} :
              </span>
              <span class="ml-2">{{ reply.msg }}</span>
            </div>
          </div>
        </template>
        <div
          v-if="comment.child.length > 1 && !showComments"
          class="more-replies"
        >
          <span @click="showComments = true">{{ comment.child.length - 1 }} more Replies</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Comment",
  props: ["comment"],
  data(){
      return {
          showComments : false,
          moreReplies : []
      }
  },
  computed:{
      getMoreComments(){
          return this.moreReplies = this.comment.child.slice(1)
      }
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
    screenClicked() {
      this.$router.push({ name: "Screen", params: { id: this.screenData.id } });
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 0.25rem !important;
}
.text {
  font-size: 0.9rem;
}
.main-comment {
  display: flex;
  border-bottom: 1px solid #d6d0d0;
  padding: 0 15px 10px;
}
.profile-img {
  width: 30px;
  border-radius: 50%;
  margin-right: 1rem;
}
.my-image {
  width: 100%;
  height: 26rem;
}
.card:hover {
  cursor: pointer;
}
.child-comment {
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 6px;
  background-color: #ecebeb;
}
.child-comment img {
  height: fit-content;
}
.child-comment input[type="text"] {
  flex: 2;
  margin-right: 1rem;
  padding: 0 10px;
  height: 1.875rem;
}
.child-comment button {
  border-radius: 16px;
}
.reply-comment {
  display: flex;
  align-items: center;
  margin-top: 10px;
  max-height: 130px;
  overflow-y: auto;
  padding: 10px 0;
}
.show-replies{
    display: block !important;
}
.reply-comment .box {
  padding: 4px 8px;
  background-color: #ecebeb;
  flex: 1;
  margin-right: 10px;
}
.box span {
  margin: 0;
  font-size: 0.87rem;
}
.more-replies {
  color: blue;
  word-spacing: 1px;
}
</style>
