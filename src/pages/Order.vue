<template>
  <div class="order">
    <div class="container">
      <div class="container">
        <main>
          <div class="py-5 text-center">
            <h2>주문하기</h2>
            <p class="lead">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>
          <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
              <h4
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <span class="text-primary">구입목록</span>
                <span class="badge bg-primary rounded-pill">{{
                  state.items.length
                }}</span>
              </h4>
              <ul class="list-group mb-3">
                <li
                  class="list-group-item d-flex justify-content-between lh-sm"
                  v-for="(i, idx) in state.items"
                  :key="idx"
                >
                  <div>
                    <h6 class="my-0">{{ i.name }}</h6>
                    <small class="text-muted">Brief description</small>
                  </div>
                  <span class="text-muted"
                    >{{
                      lib.getNumberFormatted(
                        i.price - (i.price * i.discountPer) / 100
                      )
                    }}원</span
                  >
                </li>

                <li
                  class="list-group-item d-flex justify-content-between bg-light"
                >
                  <div class="text-success">
                    <h6 class="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span class="text-success">−$5</span>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                  <span>Total</span>
                  <strong>
                    {{ lib.getNumberFormatted(computedPrice) }}원
                  </strong>
                </li>
              </ul>
            </div>
            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">주문자 정보</h4>
              <div class="needs-validation" novalidate>
                <div class="row g-3">
                  <div class="col-12">
                    <label for="username" class="form-label">이름</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Username"
                      v-model="state.form.name" 
                    />
                    <!-- v-model로 값 전달 -->
                    <div class="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="address" class="form-label">주소</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Username"
                      v-model="state.form.address"
                    />
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <h4 class="mb-3">결제수단</h4>

                <div class="my-3">
                  <div class="form-check">
                    <input
                      id="card"
                      name="paymentMethod"
                      type="radio"
                      class="form-check-input"
                      value="card"
                      v-model="state.form.payment"
                    />
                    <label class="form-check-label" for="card"
                      >신용카드</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      id="bank"
                      name="paymentMethod"
                      type="radio"
                      class="form-check-input"
                      value="bank"
                      v-model="state.form.payment"
                    />
                    <label class="form-check-label" for="bank"
                      >무통장 입금</label
                    >
                  </div>
                </div>

                <div class="row gy-3">
                  <div class="col-md-6">
                    <label for="cc-name" class="form-label">카드 번호</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cc-name"
                      v-model="state.form.cardNumber"
                    />
                    <div class="invalid-feedback">Name on card is required</div>
                  </div>
                </div>
                <hr class="my-4" />
                <button class="w-100 btn btn-primary btn-lg" @click="submit()">
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import axios from "axios";
import lib from "@/scripts/lib";
import router from '@/scripts/router';

export default {
  setup() {
    const state = reactive({
      items: [],
      form: { //form 안에 입력받은 데이터들을 집어넣음
        name: "",
        address: "",
        payment: "",
        cardNumber: "",
        items: "",
      },
    });
    const load = () => {
      axios.get("/api/cart/items").then(({ data }) => {
        console.log(data);
        state.items = data;
      });
    };

    const submit = () => {
        const args = JSON.parse(JSON.stringify(state.form)); // 참조값의 연결고리를 끊는작업
        args.items = JSON.stringify(state.items);
        axios.post("/api/orders", args).then(() => {
            console.log(args);
            console.log("Order successfully submitted");
            alert("주문완료");
            router.push({path: "/orders"});
        });
    }

    const computedPrice = computed(() => {
      let result = 0;
      for (let i of state.items) {
        result += i.price - (i.price * i.discountPer) / 100;
      }
      console.log(result);
      return result;
    });

    load();
    return { state, lib, computedPrice ,submit};
  },
};
</script>

<style scoped>
</style>