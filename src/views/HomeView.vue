<template>
  <div class="home">
    <div class="display">
      <header>
        <h1 @click="reloadPage()">MStore</h1>
        <form @submit.prevent="searchMovies">
          <input
            type="text"
            placeholder="Search for movie..."
            v-model="query"
            @input="handleInput"
          />
          <button type="submit" class="button">
            <BootstrapIcon icon="search" />
          </button>
        </form>
      </header>
      <section>
        <div>
          <div class="cards" v-if="query">
            <CardMovie
              v-for="movie in movies.results"
              :key="movie.id"
              :movie="movie"
              @add-to-cart="addToCart(movie)"
            />
          </div>
          <div class="cards" v-else>
            <CardMovie
              v-for="movie in movies.results"
              :key="movie.id"
              :movie="movie"
              @add-to-cart="addToCart"
            />
          </div>
        </div>
      </section>
    </div>
    <CartView class="cart-view" :cart="this.cart" @removeItem="removeItem" />
  </div>
</template>

<script>
// @ is an alias to /src
import CartView from "./CartView.vue";
import CardMovie from "../components/Card.vue";
import MoviesService from "../service/MoviesService";
export default {
  name: "HomeView",
  components: { CartView, CardMovie },
  data() {
    return {
      query: "",
      movies: [],
      cart: [],
    };
  },
  watch: {
    query: {
      handler() {
        this.searchMovies();
      },
      immediate: true,
      deep: true,
    },
    cart: {
      handler() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      deep: true,
    },
  },
  computed: {
    filteredMovies() {
      return this.movies.results.filter((movie) => {
        return movie.title.toLowerCase().includes(this.query.toLowerCase());
      });
    },
  },
  created() {
    this.fetchMovies();
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  },
  methods: {
    async reloadPage() {
      this.movies = await MoviesService.popularMovies();
      this.query = "";
    },
    async searchMovies() {
      this.movies = await MoviesService.searchMovies(this.query);
    },
    async fetchMovies() {
      this.movies = await MoviesService.popularMovies();
    },
    addToCart(item) {
      this.cart.push(item);
      console.log(this.cart);
    },
    removeItem(i) {
      this.cart.splice(i, 1);
    },
  },
};
</script>
<style scoped>
.home {
  display: flex;
  width: 100%;
  height: 100%;
}
.display {
  width: 70%;
}
/* header */
header {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
}
header h1 {
  font-size: 50px;
  padding: 0 2rem 0 2rem;
  color: rgb(49, 82, 49);
  cursor: pointer;
}
header form {
  align-self: end;
  width: 80%;
}
header form input {
  width: 60%;
  font-size: 20px;
  border: none;
  padding: 5px;
  margin-bottom: 3rem;
  background: rgba(234, 231, 231, 0.593);
  border-radius: 5px 0 0 5px;
}
header form button {
  border: none;
  font-size: 20px;
  padding: 5px 5px 3.5px 5px;
  border-radius: 0 5px 5px 0;
  color: #fff;
  appearance: none;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  background-size: 200%;
  background-image: linear-gradient(
    to right,
    rgb(91, 91, 91) 50%,
    rgb(68, 134, 37) 50%
  );
  transition: 0.4s;
}
header form button:hover {
  background-position: right;
}

/* cards */
.cards {
  display: flex;
  flex-wrap: wrap;
}
.cart-view {
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(238, 237, 237, 0.784);
  padding: 1rem;
  border-radius: 0 0 10px 10px;
}
</style>
