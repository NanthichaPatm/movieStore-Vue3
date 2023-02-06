<template>
  <div v-if="showModal" class="checkout-modal">
    <div class="checkout-modal-content">
      <h2>Checkout</h2>
      <p>Your order total is: {{ totalPrice }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckoutModal",
  props: {
    totalPrice: Number,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
.checkout-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
