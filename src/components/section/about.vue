<template>
  <section id="about">
    <div class="title">
      <div class="container">
        <h2>ABOUT ME</h2>
        <img id="astronaut2" alt="astronaut" src="@/assets/img/german_faller_astronaut_2.svg">
      </div>
    </div>
    <div class="container content">

      <img id="german" alt="German Faller" src="@/assets/img/german_faller.png">
      <div>
        <p>
          Hello! my name is German. I was born on February 19, 1993 in the city of
          <a href="https://goo.gl/maps/sxypckYk4vXqwgb28" target="_blank">Dolores-Soriano, Uruguay</a>.
          However, I currently reside in Montevideo. Since my childhood I began to be curious about technology
          and in my adolescence the passion for programming emerged in me. That is why today I am a Computer Engineer,
          graduated from the <a href="https://udelar.edu.uy/" target="_blank">University of the Republic</a>.
        </p>

        <p>
          Some of my hobbies are: mountain biking, playing pool and ping pong. I have an adventurous soul,
          I really enjoy the little things in life, sharing with friends and family fills my heart.
          Drinking coffee and mate have been my allies since college.
        </p>

        <p>Do you want us to get to know each other better?</p>

        <div class="social">
          <a class="sn" href="https://www.linkedin.com/in/faller222/" target="_blank">
            <img alt="linkedin"
                 src="@/assets/img/network/german_faller_linkedin.svg"></a>

          <a class="sn" href="https://stackoverflow.com/users/9300379/" target="_blank">
            <img alt="stackoverflow"
                 src="@/assets/img/network/german_faller_stackoverflow.svg"></a>

          <a class="sn" href="https://github.com/faller222/" target="_blank">
            <img alt="github"
                 src="@/assets/img/network/german_faller_github.svg"></a>

          <a class="sn" href="https://gitlab.fing.edu.uy/german.faller/" target="_blank">
            <img alt="College Repository"
                 src="@/assets/img/network/german_faller_college.svg"></a>

          <a class="sn" href="https://www.instagram.com/faller222/" target="_blank">
            <img alt="instagram"
                 src="@/assets/img/network/german_faller_instagram.svg"></a>

          <a class="sn" href="https://twitter.com/faller222/" target="_blank">
            <img alt="twitter"
                 src="@/assets/img/network/german_faller_twitter.svg"></a>
        </div>

        <nuxt-link class="btn-contact" :to="{ path: '/', hash:'#contact'}">CONTACT ME</nuxt-link>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "about"
}
</script>

<style lang="scss" scoped>
#about {
  background-color: #FFFFFF;
  color: #000000;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    #german{
      height: 16rem;
      width: 16rem;
      margin: 1rem;
    }

    p{
      padding: 0 1.5rem;
    }

    .social{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      padding: 20px;

      a img{
        height: 2rem;
        width: 2rem;
      }
    }

    .btn-contact {
      display: block;
      padding: 1rem;
      margin: 1rem;
      border-radius: 0.5rem;
      background-color: #002c23;
      color: #FFFFFF;
      text-decoration: none;
      text-align: center;

      &:after {
        margin-left: 0.5rem;
        content: '>';
      }
    }
  }

  .title {
    background-color: #002C23;
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

  @media (min-width: 768px) {
    //Small screens, laptops
    .content {
      flex-direction: row;
    }

    .container {
      position: relative;

      #astronaut2 {
        position: absolute;
        right: 4rem;
        top: -3.5rem;
        width: 12rem;
        height: 12rem;
      }
    }

  }

  //.title {
  //  margin-top: 90px;
  //
  //  text-align: end;
  //
  //  div {
  //    display: inline-block;
  //    background-color: #002C23;
  //    color: #FFFFFF;
  //    padding: 25px;
  //    width: 60%;
  //
  //    h1 {
  //      width: 300px;
  //      background-color: #c4001d;
  //      box-shadow: 10px 23px 0 5px #002c23 inset;
  //      font-style: normal;
  //      font-weight: 800;
  //      font-size: 36px;
  //      line-height: 50px;
  //      text-align: left;
  //    }
  //  }
  //}
  //
  //#astronaut {
  //  position: absolute;
  //  width: 323px;
  //  height: 277px;
  //  right: 200px;
  //  top: -256px;
  //}
  //
  //.btn-contact {
  //  display: inline-block;
  //
  //  width: 250px;
  //  height: 60px;
  //
  //  padding: 16px;
  //  border-radius: 10px;
  //  background-color: #002c23;
  //  color: #FFFFFF;
  //  text-decoration: none;
  //
  //  font-style: normal;
  //  font-weight: 800;
  //  font-size: 22px;
  //  line-height: 26px;
  //  text-align: center;
  //
  //  &:after {
  //    margin-left: 8px;
  //    content: '>';
  //  }
  //}
  //
  //p {
  //  font-style: normal;
  //  font-weight: normal;
  //  font-size: 20px;
  //  line-height: 23px;
  //  text-align: center;
  //}
  //
  //.sn {
  //  img {
  //    width: 34.9px;
  //    height: 32.13px;
  //  }
  //
  //  margin-right: 30px;
  //
  //  &:last-child {
  //
  //    margin-right: 0;
  //  }
  //}
  //
  //.left {
  //  width: 40%;
  //  display: inline-flex;
  //  height: 100px;
  //}
  //
  //.right {
  //  display: inline-flex;
  //  width: 50%;
  //  flex-direction: column;
  //  align-content: flex-end;
  //  align-items: center;
  //}
}
</style>
