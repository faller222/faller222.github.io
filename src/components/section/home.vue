<template>
  <section id="home" ref="home">

    <img id="banner" alt="banner" src="@/assets/img/german_faller_banner.webp">
    <img id="banner-cover" alt="banner_cover" src="@/assets/img/german_faller_banner_cover.svg">

    <div class="container">
      <div class="logo">
        <img alt="GF-logo" src="@/assets/img/german_faller_circle.svg" :style="styleLogo">
        <div class="slogan" :style="styleSlogan">
          <span class="line">I MAKE</span>
          <span class="line">THINGS</span>
          <span class="line">HAPPEN</span>
        </div>
      </div>

      <img id="moon" alt="moon" src="@/assets/img/german_faller_moon.png" :style="styleMoon">
      <img id="astronaut" alt="astronaut" src="@/assets/img/german_faller_astronaut_1.png" :style="styleAstronaut">

    </div>
  </section>
</template>

<script>
const delta = 20;

export default {
  name: "home",
  computed:{
    styleLogo() {
      const x = (this.x + window.innerWidth) / -50
      const y = (this.y + window.innerHeight) / -50

      return `transform: translateX(${x}px) translateY(${y}px);`
    },
    styleSlogan() {
      const x = (this.x - window.innerWidth) / 50
      const y = (this.y - window.innerHeight) / 50

      return `transform: translateX(${x}px) translateY(${y}px);`
    },
    styleAstronaut() {
      const x = 4 + this.x / 200
      const y = 5 + this.y / -200

      return `left: ${x}rem; bottom:${y}rem;`
    },
    styleMoon() {
      const x = 2 + this.x / 200
      const y = 12 + this.y / -200

      return `right: ${x}rem; top:${y}rem;`
    }
  },
  data() {
    return {
      x: null,
      y: null
    }
  },
  mounted() {
    this.$refs.home.addEventListener('mousemove', function (e) {
      this.move(e.x, e.y, null)
    }.bind(this),true)

    window.addEventListener('deviceorientation', function (e) {
      const x = (e.alpha + 180) % 360 * 2
      const y = (e.beta + e.gamma) * 5

      this.move(x, y)
    }.bind(this), true)

  }, methods: {
    move(x, y) {
      this.x = x
      this.y = y
    }
  }
}
</script>

<style scoped lang="scss">
#home {

  #banner, #banner-cover {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  #banner-cover {
    opacity: 0.6;
  }

  .logo {
    $logo-size: 20rem;
    width: $logo-size;
    height: $logo-size;
    margin: 45% auto 4rem;

    position: relative;
    user-select: none;

    img {
      height: 100%;
      width: 100%;
    }

    .slogan {
      position: absolute;
      top: 8.7rem;
      left: 12.5rem;

      .line {
        font-size: 2.5rem;
        line-height: 3.5rem;

        white-space: pre;

        //&:nth-child(2) {
        //  margin-top: 3rem;
        //}
        //&:nth-child(3) {
        //  margin-top: 2rem;
        //}
      }
    }
  }


  #moon {
    position: absolute;
    width: 8rem;
    height: 8rem;
    right: 4rem;
    top: 6rem;

    animation: moveM 10s infinite linear 2s;
  }

  #astronaut {
    position: absolute;
    width: 10rem;
    height: 10rem;
    left: 4rem;
    bottom: 5rem;

    animation: moveA 10s infinite linear 2s;
  }

  @keyframes moveA {
    0% { transform: rotate(15deg) translateX(-25%) translateY(0px);}
    25% { transform: rotate(0deg) translateX(0px) translateY(25%);}
    50% { transform: rotate(-15deg) translateX(25%) translateY(0px);}
    75% { transform: rotate(0deg) translateX(0px) translateY(25%);}
    100% { transform: rotate(15deg) translateX(-25%) translateY(0px);}
  }

  @keyframes moveM {
    0% { transform: rotate(-15deg) translateX(25%) translateY(0px);}
    25% { transform: rotate(0deg) translateX(0px) translateY(25%);}
    50% { transform: rotate(15deg) translateX(-25%) translateY(0px);}
    75% { transform: rotate(0deg) translateX(0px) translateY(25%);}
    100% { transform: rotate(-15deg) translateX(25%) translateY(0px);}
  }

  @media (min-width: 768px) {
    //Small screens, laptops

    .logo {
      margin-top: 14rem;
    }

    #moon {
      right: 2rem;
      top: 12rem;
    }

    #astronaut {
      left: 6rem;
      bottom: 12rem;
    }
  }

}
</style>
