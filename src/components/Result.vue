<template>
  <div class="result-wrapper">
    <div class="result">
      <svg v-if="success" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          fill="#596e5f"
        />
      </svg>
      <svg v-if="!success" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"
          fill="#596e5f"
        />
      </svg>
      <p>La bonne réponse était {{success ? 'en effet' : 'en réalité'}} :</p>
      <p class="answer">{{answer}}</p>
      <div class="progress-striped">
        <div ref="progressBar" class="progress-bar"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
  props: {
    answer: String,
    success: Boolean
  },
  mounted: function() {
    this.$refs.progressBar.addEventListener("animationend", () => {
      this.$emit("answer-seen");
    });
  }
};
</script>

<style scoped>
.result-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 24px;
  width: 100%;
  max-width: 370px;
  box-sizing: border-box;
}

.result {
  position: relative;
}

svg {
  width: 62px;
  height: 62px;
}
.answer {
  text-transform: capitalize;
  padding: 6px 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: inline-block;
  font-weight: 600;
}

.progress-striped {
  margin-top: 25px;
  padding: 6px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(148, 5, 5, 0.08);
}

.progress-bar {
  height: 18px;
  background-color: #ee303c;
  border-radius: 4px;
  transition: 0.4s linear;
  transition-property: width, background-color;
}

.progress-striped .progress-bar {
  background-color: rgb(89, 110, 95);
  width: 100%;
  background-image: linear-gradient(
    45deg,
    rgb(89, 110, 95) 25%,
    transparent 25%,
    transparent 50%,
    rgb(99, 140, 95) 50%,
    rgb(89, 110, 95) 75%,
    transparent 75%,
    transparent
  );
}

.progress-striped .progress-bar {
  animation: progressAnimationStrike 3s;
}

@keyframes progressAnimationStrike {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>