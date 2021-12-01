<template>
  <div class="main">
    <div
      class="
        header
        shadow
        bg-body
        rounded
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <p @click="activate(1)" :class="{ 'active-tab': active_tab == 1 }">New</p>
      <p @click="activate(2)" :class="{ 'active-tab': active_tab == 2 }">
        Most Rated
      </p>
    </div>
    <div class="main-container">
      <template v-if="screens.length == 0">
        <div class="d-flex justify-content-center align-items-center vw-100 vh-100" >
          <h4>No screens to show</h4>
        </div>
      </template>
      <template v-else>
      <ul class="grid-wrapper" :class="category_tab">
        <li v-for="screen in displayedPosts" :key="screen.id">
          <Screen :screenData="screen" :screenCategory="category_tab" />
        </li>
      </ul>
      </template>
      <!-- <div class="container"> -->
    </div>
    <nav aria-label="Page navigation" class="navigation">
      <ul class="pagination">
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-if="page != 1"
            @click="page--"
          >
            Previous
          </button>
        </li>
        <li class="page-item number">
          <button
            type="button"
            class="page-link"
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            :key="pageNumber"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            @click="page++"
            v-if="page < pages.length"
            class="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {getScreens} from '../services/Screen'
import Screen from "../components/Screen.vue";
import screenData from "../assets/screens.json";
export default {
  components: {
    Screen,
  },
  data() {
    return {
      screens: [],
      allScreens : [],
      active_tab: 1,
      page: 1,
      perPage: 12,
      pages: [],
      category_tab: "Mobile",
    };
  },
  methods: {
    activate(el) {
      if (el == 1) {
        this.screens = this.screens.sort(
          (a, b) => a.id - b.id
        );
      } else {
        this.screens = this.screens.sort(
          (a, b) => b.totalRating - a.totalRating
        );
      }

      this.active_tab = el;
    },
    setPages() {
      let numberOfPages = Math.ceil(this.screens.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(screens) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return screens.slice(from, to);
    },
    getScreensData(){
      // try{
      //   let data = await getScreens()
      //   console.log(data)
      //   this.allScreens = data
      //   this.screens = data.filter(e => e.category == 'Mobile')
      //   console.log(data)
      // }catch(e){
      //   console.log(e)
      // }
       this.$http.get('/screen/get').then(res => {
        console.log(res)
        let data = res.data.map((e, index) => {
        let picture64Bit = btoa(String.fromCharCode(...new Uint8Array(e.img.data.data)));
        e.img = 'data:image/jpg;base64,' + picture64Bit
         
        return e
        })
        this.allScreens = data
        this.screens = data.filter(e => e.category == 'Mobile')
      }).catch(err => {
        throw new Error(err)
      })
    }
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.screens);
    },
  },
  created() {
    this.setPages();
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  mounted() {
    this.getScreensData()
    this.$bus.$on("change_category", (message) => {
      this.screens = this.allScreens.filter((e) => e.category == message);
      this.category_tab = message;
      this.perPage = message == "Mobile" ? 12 : 6;
    });

    this.$bus.$on("screen_upload", (data) => {
        this.getScreensData()
    });
  },
};
</script>

<style scoped>
.main {
  background-color: #eaeaea;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.grid-wrapper {
  --auto-grid-min-size: 14.4rem;
  display: grid;
  grid-gap: 1.2rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.grid-wrapper.Mobile {
  --auto-grid-min-size: 14.4rem;
}
.grid-wrapper.Web {
  --auto-grid-min-size: 22.4rem;
}

.grid-wrapper li {
  margin: 0 auto;
}

.main-container {
  margin: 0 auto;
  padding: 2rem 1rem;
}
.header {
  background-color: white;
}
.header p {
  margin: 0 1rem;
  padding: 0.5rem 0.5rem;
}
.header p:hover {
  cursor: pointer;
}
.active-tab {
  border-bottom: 5px solid black;
}

.navigation {
  margin: 1rem 0;
  display: flex;
  justify-content: end;
}
.pagination .number {
  display: flex;
}
@media (max-width: 400px) {
  .grid-wrapper {
    --auto-grid-min-size: 14.4rem !important;
  }
}
</style>
