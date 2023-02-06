<template>
  <div class="container">
    <header>
      <h2>Shopping Cart</h2>
      <span><BootstrapIcon icon="cart-check-fill" size="3x" /></span>
    </header>
    <section>
      <hr />
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          <div class="content-item">
            <h4 class="content-title">
              {{ item.movie.title }}
            </h4>
            <h3 class="content-price">{{ item.price }} $</h3>
          </div>
          <div class="content-btn" @click="removeItem(index)">
            <span class="remove">
              <BootstrapIcon icon="trash3" />
            </span>
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <div class="discount">
        <span>discount</span>
        <span>{{ discount }}%</span>
      </div>
      <div class="full-price" v-if="totalPrice != fullPrice">
        <span>full-price</span>
        <span>{{ fullPrice.toFixed(2) }} $</span>
      </div>
      <div class="total">
        <h1>Total</h1>
        <h1>{{ totalPrice }} $</h1>
      </div>
      <button class="check-out" @click="checkOut" :disabled="cart.length <= 0">
        <BootstrapIcon icon="cart-check-fill" /> Check-out
      </button>
    </footer>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <div><h1>Payment Method</h1></div>
        <div>
          <p>To complete your payment, please follow the steps below:</p>
        </div>
        <div class="steps">
          <div>
            <img class="steps-img" src="../assets/Portfolio.png" />
            <div class="download">
              <a download="NanthichaP-PortfolioQR.png" href="/Portfolio.png"
                ><BootstrapIcon icon="download" size="md"
              /></a>
            </div>
          </div>
          <div class="steps-text">
            <ul>
              <li>- Scan QR on your camera with QR supported APP</li>
              <li>
                - Save the QR code and upload QR in your supported APP to
                complete the transaction.
              </li>
            </ul>
            <h1>Total: {{ totalPrice }} $</h1>
          </div>
        </div>

        <div class="countdown">
          <p>{{ timer }}</p>
          <div class="countdown-progress">
            <div class="countdown-bar" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </div>
      <button class="close-button" @click="closeModal">
        <BootstrapIcon icon="x-circle-fill" size="3x" />
      </button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "CartView",
  components: {},
  props: { cart: [] },
  data() {
    return {
      showModal: false,
      timer: 60,
    };
  },
  created() {
    this.countDown();
  },
  methods: {
    removeItem(i) {
      this.$emit("removeItem", i);
    },
    checkOut() {
      this.showModal = true;
    },
    countDown() {
      setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          this.progress = (this.timer / 60) * 100;
        } else {
          this.closeModal();
        }
      }, 1000);
    },
    closeModal() {
      this.showModal = false;
    },
  },
  computed: {
    discount() {
      if (this.cart.length > 5) {
        return 20;
      } else if (this.cart.length > 3) {
        return 10;
      }
      return 0;
    },
    totalPrice() {
      let sum = 0;
      for (const item of this.cart) {
        sum += item.price;
      }
      return ((sum * (100 - this.discount)) / 100).toFixed(2);
    },
    fullPrice() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    },
  },
};
</script>
<style scoped>
.container {
  width: 25%;
  margin-right: 1rem;
  height: 48rem;
  display: flex;
  flex-direction: column;
}
header {
  display: flex;
  justify-content: space-between;
}
.container header span {
  padding: 3rem auto;
}
.container header h2 {
  padding: 3rem auto;
  margin: 5px;
}
ul {
  padding-left: 5px;
}
.content-item {
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
  background: #fff;
  width: 100%;
  padding: 5px;
  border-radius: 10px 0 0 10px;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
}
.content-title {
  margin: 5px;
}
.content-price {
  margin: 5px;
  align-self: end;
}
.remove {
  margin: auto 0px;
  vertical-align: middle;
  align-self: center;
  color: #fff;
}
.content-btn {
  display: flex;
  background: rgb(74, 84, 73);
  align-self: stretch;
  margin: 5px 0px;
  padding: 5px;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  background-size: 200%;
  background-image: linear-gradient(
    to right,
    rgb(74, 84, 73) 50%,
    rgb(187, 66, 66) 50%
  );
  transition: 0.4s;
}
.content-btn:hover {
  background-position: right;
}
section {
  overflow: auto;
}
footer {
  margin-top: auto;
  margin-right: 0;
  margin-left: 0;
}
.discount {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}
.total {
  display: flex;
  justify-content: space-between;
}
.full-price {
  display: flex;
  justify-content: space-between;
}
.full-price :nth-child(2) {
  text-decoration: line-through;
  color: rgb(152, 59, 59);
}
.check-out {
  width: 100%;
  font-size: 20px;
  padding: 10px;
  border: none;
  color: #fff;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background-size: 200%;
  background-image: linear-gradient(
    to right,
    rgb(41, 86, 37) 50%,
    rgb(59, 183, 82) 50%
  );
  transition: 0.4s;
  cursor: pointer;
}
.check-out:hover {
  background-position: right;
}
.check-out:disabled {
  background: rgba(128, 128, 128, 0.489);
  color: rgba(69, 65, 65, 0.653);
  cursor: wait;
}
/* .modal-content {
  background: white;
  margin-right: 20rem;
  margin-left: 10rem;
  width: 50%;
  height: 50%;
  padding: 5rem;
}
.modal {
  position: absolute;
  left: -100%;
  padding: 10rem;
  width: 100%;
  height: 100%;
  background: rgba(148, 148, 148, 0.446);
  z-index: 1;
  margin-top: -5rem;
} */
.modal-content {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  padding: 5rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(148, 148, 148, 0.446);
  z-index: 1;
}
.steps {
  display: flex;
}
.steps-img {
  width: 15rem;
  height: 15rem;
  padding-right: 4rem;
}
.steps-text h1 {
  text-align: end;
}
.steps-text ul li {
  margin: 10px;
}
.download {
  width: 100%;
  padding-top: 1rem;
}
.download a {
  border: none;
  background: rgb(61, 144, 75);
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  cursor: pointer;
}
.download a:hover {
  background: rgb(57, 71, 59);
}
.countdown {
  width: 100%;
  margin-top: auto;
}
.countdown-progress {
  height: 10px;
  width: 100%;
  background: lightgray;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.countdown-bar {
  height: 100%;
  background: green;
  border-radius: 5px;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(to right, #af4c59, #8bc34a);
  transition: width 1s linear;
}
.close-button {
  color: rgb(151, 0, 0);
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 77%;
  top: 15%;
}
</style>
