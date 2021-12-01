<template>
  <div class="rating">
    <ul class="list">
      <li @click="rate(star)" v-for="star in maxStars" :class="{ 'active': star <= stars }" :key="star.stars" class="star">
      <i :class="star <= stars ? 'fa fa-star' : 'fa fa-star'"></i> 
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Rating',
  props: ['grade', 'maxStars', 'hasCounter'],
  data() {
    return {
      stars: this.grade
    }
  },
  methods: {
    rate(star) {
      if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .rating .list {
	 padding: 0;
	 margin: 0 20px 0 0;
}
 .rating .list:hover .star {
	 color: #ffe100;
}
 .rating .list .star {
	 display: inline-block;
	 /* font-size: 42px; */
	 transition: all 0.2s ease-in-out;
	 cursor: pointer;
     padding: 0 5px;
     color: #ddd;
}
 .rating .list .star:hover ~ .star:not(.active) {
	 color: #ddd;
}
 .rating .list .star:first-child {
	 margin-left: 0;
}
 .rating .list .star.active {
	 color: #ffe100;
}
 .rating .info {
	 margin-top: 15px;
	 font-size: 40px;
	 text-align: center;
	 display: table;
}
 .rating .info .divider {
	 margin: 0 5px;
	 font-size: 30px;
}
 .rating .info .score-max {
	 font-size: 30px;
	 vertical-align: sub;
}
 
</style>