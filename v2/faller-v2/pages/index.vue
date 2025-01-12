<template>
  <div class="lala">
    <h1>Welcome to Nuxt 3 + TypeScript!</h1>
    <form @submit.prevent="handleSubmit">
      <label for="name">Enter your name:</label>
      <input id="name" v-model="name" type="text" placeholder="Your name"/>
      <button type="submit">Greet Me</button>
    </form>
    <p v-if="greeting">{{ greeting }}</p>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

// Define the types
const name = ref<string>(''); // `name` is a string
const greeting = ref<string | null>(null); // `greeting` can be string or null

// Function to handle the form submission
const handleSubmit = () => {
  if (name.value.trim()) {
    greeting.value = `Hello, ${name.value}!`;
  } else {
    greeting.value = 'Please enter a valid name.';
  }
};
</script>

<style scoped lang="scss">
.lala {
  h1 {
    color: #0f0;
  }
}

h1 {
  font-size: 2rem;
  color: #333;
}

form {
  margin-top: 1rem;
}

button {
  margin-left: 0.5rem;
}
</style>
