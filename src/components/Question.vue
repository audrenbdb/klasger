<template>
  <div class="question-wrapper">
    <div class="question">
      <h1>{{ bzh }}</h1>
      <div class="context-quote">{{ context }}</div>
      <div class="tips">
        <div v-for="word of proximity" v-bind:key="word" class="tip">{{ word }}</div>
      </div>
      <form id="submit-input" @submit.prevent="$emit('check-answer', questionAnswer)">
        <div class="form-group">
          <input
            ref="input"
            id="answer"
            v-model="questionAnswer"
            class="form-control"
            type="text"
            placeholder=" "
            autocomplete="off"
          />
          <label class="form-placeholder" for="answer">Saisissez l'infinitif en français</label>
          <button type="submit" class="form-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" fill="#596e5f" />
            </svg>
          </button>
        </div>
      </form>
    </div>
    <p>
      <router-link to="/insert">Ajouter</router-link>
      <router-link to="/list">Liste</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    bzh: String,
    contexts: Array,
    proximity: Array
  },
  data() {
    return {
      questionAnswer: "",
      context: ""
    };
  },
  methods: {
    submitAnswer: function() {}
  },
  created: function() {
    this.context = this.$props.contexts[
      Math.floor(Math.random() * this.$props.contexts.length)
    ];
  },
  mounted: function() {
    this.$refs.input.focus();
  }
};
</script>

<style scoped>
h1 {
  text-transform: capitalize;
}
.question-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 370px;
  box-sizing: border-box;
}
.question {
  background: #fff;
    padding: 24px;

}

@media screen and (max-width: 500px) {
  .question {
    position: static;
    top: auto;
    left: auto;
    transform: none;
    margin-left: auto;
    margin-right: auto;
  }
}

.context-quote {
  position: relative;
  border-left: 0.2em solid rgb(89, 110, 95);
  font-size: 20px;
  padding-left: 10px;
  margin: 30px 0px;
}
.context-quote:before,
.context-quote:after {
  content: "\201C";
  color: #2c3e50;
}
.context-quote:after {
  content: "\201D";
}
.tips {
  display: flex;
  justify-content: center;
}
.tip {
  padding: 6px 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  text-transform: capitalize;
}
#submit-input {
  margin-top: 25px;
  margin-bottom: 40px;
}

.form-group {
  position: relative;
  margin: 20px auto;
  width: 90%;
}

.form-control {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  box-shadow: none;
  height: 40px;
  outline: none;
  position: relative;
}

.form-control:not(:placeholder-shown):valid {
  border-color: rgb(89, 110, 95);
}

.form-control:not(:placeholder-shown):invalid:not(:focus) {
  border-color: red;
}

.form-placeholder {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 200ms;
  opacity: 0.5;
  color: #667;
  pointer-events: none;
  left: 0;
}

.form-control:not(:placeholder-shown) + .form-placeholder {
  font-size: 75%;
  top: 0;
  transform: translate3d(0, -75%, 0);
  opacity: 1;
  color: #2c3e50;
}

.form-icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  visibility: hidden;
}

.form-control:valid ~ .form-icon {
  visibility: visible;
}
p a {
  color: #2c3e50;
  margin: 0px 10px;
}
</style>
