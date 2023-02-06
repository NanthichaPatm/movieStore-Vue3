import axios from "axios";

const api_endpoint =
  process.env.VUE_APP_API_URL || "https://api.themoviedb.org/3";
const apiKey = "67fe6f7d421d56a1418fb80c1d719ef5";

export default {
  async searchMovies(query) {
    let url = `${api_endpoint}/search/movie?api_key=${apiKey}&query=${query}`;
    let res = await axios.get(url);
    console.log(res);
    return res.data;
  },
  async popularMovies() {
    let url = `${api_endpoint}/movie/popular?api_key=${apiKey}`;
    let res = await axios.get(url);
    console.log(res);
    return res.data;
  },
};
