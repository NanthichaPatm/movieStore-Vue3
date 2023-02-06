<template>
  <div class="card">
    <img
      :src="
        'https://image.tmdb.org/t/p/w300' + movie.poster_path ||
        'https://via.placeholder.com/300x450'
      "
    />
    <h3>{{ movie.title }}</h3>
    <span class="score">{{ movie.vote_average }}/10</span>
    <p>Release Date: {{ movie.release_date }}</p>
    <span class="price">{{ price }} $</span>
    <span class="addItem" @click="addToCart(movie, price)"
      ><BootstrapIcon icon="bag-plus-fill" size="2x" />
    </span>
  </div>
</template>
<script>
export default {
  name: "CardMovie",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      let price = 5.99;
      const voteAverage = this.movie.vote_average;
      if (voteAverage >= 8.5) {
        return (price = 12.99);
      } else if (voteAverage >= 8.0) {
        return (price = 10.99);
      } else if (voteAverage >= 7.5) {
        return (price = 9.99);
      } else if (voteAverage >= 7.0) {
        return (price = 7.99);
      } else if (voteAverage >= 6.5) {
        return (price = 6.99);
      }
      return price;
    },
  },
  methods: {
    addToCart(movie, price) {
      this.$emit("add-to-cart", { movie, price });
    },
  },
};
</script>
<style scoped>
.card {
  width: 18rem;
  height: 32rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 10px;
  margin: 10px;
  background: rgba(233, 227, 227, 0.401);
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(128, 128, 128, 0.461);
}
img {
  width: 16rem;
  border-radius: 10px;
}
h3 {
  margin: 1rem auto 5px auto;
}
p {
  font-size: 12px;
  margin: 0px auto;
}
.score {
  position: absolute;
  margin: 1rem 15rem auto 0rem;
  background: rgb(30, 75, 18);
  padding: 5px;
  border-radius: 10px;
  color: #fff;
}
.addItem {
  position: absolute;
  align-self: end;
  color: rgb(86, 104, 90);
  cursor: pointer;
  margin: 30rem 0rem auto 15rem;
}
.addItem:hover {
  color: rgb(93, 178, 100);
}
.price {
  font-weight: 700;
  font-size: 22px;
  padding: 5px;
  margin-top: 10px;
  color: rgb(131, 150, 131);
}
.card:hover .price {
  color: rgb(61, 87, 22);
}
</style>
