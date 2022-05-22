<template>
  <section id="contact">
    <img id="banner-cover" alt="banner_cover" src="@/assets/img/german_faller_banner_cover.svg">

    <div class="title">
      <div class="container">
        <h2>WANNA TALK?</h2>
      </div>
    </div>

    <div class="container content">
      <div class="form">
        <input v-model="name" placeholder="Name" name="name" type="text">
        <input v-model="mail" placeholder="e-mail" name="email" type="email">
        <textarea v-model="msg" placeholder="Message"/>
        <button @click="submit">LET´S TALK</button>
      </div>
      <img id="astronauts" alt="astronauts" src="@/assets/img/german_faller_astronauts.svg">
    </div>
  </section>
</template>

<script>
export default {
  name: "contact",
  data() {
    return {
      name: null,
      mail: null,
      msg: null,
    }
  }, methods: {
    submit() {
      const data = {name: this.name, _replyto: this.mail, message: this.msg}
      this.$axios.post(`https://formspree.io/f/xjvlglwy`, data)
        .then(this.clear)
    },
    clear() {
      this.name = null;
      this.mail = null;
      this.msg = null;
    }
  }
}
</script>

<style lang="scss" scoped>
#contact {
  #banner-cover {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;

    opacity: 0.6;
    z-index: -1;
  }

  .title {
    //background-color: #002C23;
    color: #FFFFFF;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;

      h2 {
        display: inline-block;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    padding-right: 5rem;
    padding-left: 5rem;

    .form {
      display: flex;
      flex-direction: column;

      button {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #002C23;
        background-color: #FFFFFF;
        color: #002C23;
        text-decoration: none;
        text-align: center;
        cursor: pointer;

        &:hover {
          background-color: #002C23;
          color: #FFFFFF;
          border-color: #FFFFFF;
        }
      }

      textarea {
        resize: vertical;
        height: 10rem;
      }

      textarea, input {
        padding: 1rem;
        border: 1px solid #002C23;
        color: #002C23;
        font-size: 1rem;

        &:focus-visible {
          outline: #00FFCE solid 1px;
          outline-offset: -1px;
        }
      }

      :nth-child(1) {
        border-radius: 0.5rem 0.5rem 0 0;
      }

      :nth-child(3) {
        border-radius: 0 0 0.5rem 0.5rem;
      }
    }

    #astronauts{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }


  @media (min-width: 768px) {
    //Small screens, laptops

    .content {
      padding-right: 10rem;
      padding-left: 10rem;
    }
  }

}
</style>
