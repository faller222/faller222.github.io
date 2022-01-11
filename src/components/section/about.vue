<template>
  <section id="about">

    <div class="name" style="text-align: end;">
      <div>
        <h1>ABOUT ME</h1>
      </div>
    </div>

    <div class="container">
      <img id="astronaut" alt="astronaut" src="@/assets/img/german_faller_astronaut_2.png">

      <div class="left"></div>

      <div class="right">

        <p>
          Hello! my name is Germán. I was born on February 19, 1993, in the city of Dolores located within Soriano,
          Uruguay.
          For various reasons, I currently reside in Montevideo.
          From an early age I began to be curious about technology, and from my adolescence the passion for programming
          surfaced in me.
          That is why today I am a Computer Engineer, graduated from the University of the Republic.
        </p>

        <p>
          Among my hobbies are: mountain biking, playing pool and ping pong.
          I really enjoy the little moments with friends and family, good coffee and extraordinary adventures in and out
          of Uruguay.
        </p>

        <p>Do we know each other better?</p>


        <div>
          <a href="https://www.linkedin.com/in/faller222/" target="_blank"><img alt="linkedin"
                                                                                src="@/assets/img/network/german_faller_linkedin.svg"></a>

          <a href="https://stackoverflow.com/users/9300379/" target="_blank"><img alt="stackoverflow"
                                                                                  src="@/assets/img/network/german_faller_stackoverflow.svg"></a>

          <a href="https://github.com/faller222/" target="_blank"><img alt="github"
                                                                       src="@/assets/img/network/german_faller_github.svg"></a>

          <a href="https://gitlab.fing.edu.uy/german.faller/" target="_blank"><img alt="College Repository"
                                                                                   src="@/assets/img/network/german_faller_college.svg"></a>

          <a href="https://www.instagram.com/faller222/" target="_blank"><img alt="instagram"
                                                                              src="@/assets/img/network/german_faller_instagram.svg"></a>

          <a href="https://twitter.com/faller222/" target="_blank"><img alt="twitter"
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

  .name {
    margin-top: 90px;

    text-align: end;

    div {
      display: inline-block;
      background-color: #002C23;
      color: #FFFFFF;
      padding: 25px;
      width: 60%;

      h1 {
        width: 300px;
        background-color: #c4001d;
        box-shadow: 10px 23px 0 5px #002c23 inset;
        font-style: normal;
        font-weight: 800;
        font-size: 36px;
        line-height: 50px;
        text-align: left;
      }
    }
  }

  #astronaut {
    position: absolute;
    width: 323px;
    height: 277px;
    right: 200px;
    top: -256px;
  }

  .btn-contact {
    display: inline-block;

    width: 250px;
    height: 60px;

    padding: 16px;
    border-radius: 10px;
    background-color: #002c23;
    color: #FFFFFF;
    text-decoration: none;

    font-style: normal;
    font-weight: 800;
    font-size: 22px;
    line-height: 26px;
    text-align: center;

    &:after {
      margin-left: 8px;
      content: '>';
    }
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
  }

  a {
    img {
      width: 34.9px;
      height: 32.13px;
    }

    margin-right: 30px;

    &:last-child {

      margin-right: 0;
    }
  }

  .left{
    width: 40%;
    display: inline-flex;
    height: 100px;
  }

  .right{
    display: inline-flex;
    width: 50%;
    flex-direction: column;
    align-content: flex-end;
    align-items: center;
  }
}
</style>
