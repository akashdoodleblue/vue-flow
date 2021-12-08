<template>
  <div class="card screen-card"  @click="screenClicked">
    <div class="img-container" :class="screenCategory">
    <img class="card-img-top my-image" :src="screenData.img || getImgUrl(screenData.img)" alt="Card image cap" />
    </div>
    <div class="card-body">
        <img class="profile-img" :src="screenData.createdBy.avatar || getImgUrl('uploads/profile.png')"/>
        <span>{{screenData.createdBy.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Screen",
   props: {
    screenData: {
      type: Object,
      required: true
    },
    screenCategory:{
      type : String
    },
    allScreens : {type : Array}

   },
   computed : {
     getMoreScreens(){
       console.log(this.allScreens)
        let index = this.allScreens.findIndex(e=> e._id == this.screenData._id)
        this.allScreens.splice(index, 1 )
        let array = this.allScreens.sort(() => Math.random() - Math.random()).slice(0, 4)
        console.log(array)
      //  all
      return array
     }
   },
   methods:{
       getImgUrl(pic) {
             return require('../assets/'+pic)
        },
        screenClicked(){
          this.$router.push({name : 'Screen', params : {id : this.screenData._id, moreScreens : JSON.stringify(this.getMoreScreens)}})
        }
   }
};
</script>

<style scoped>
    .img-container{
      width: 13rem;
      height: 20rem;
      overflow: hidden;
    }

    .img-container.Mobile{
      width : 13rem !important;
    }

    .img-container.Web{
      width : 100% !important;
    }

    .card-body{
        padding: 0.5rem;
    }
    .profile-img{
        width:30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 1rem;
    }
    .my-image{
        width: 100%;
        min-height: 100%;
        object-fit: cover;
    }
    .card:hover{
        cursor: pointer;
    }
</style>
