<template>
  <section id="home">

    <img id="banner" alt="banner" src="@/assets/img/german_faller_banner.webp">
    <img id="banner-cover" alt="banner_cover" src="@/assets/img/german_faller_banner_cover.svg">

    <div class="container">
      <div class="logo">
        <img alt="circle" src="@/assets/img/german_faller_circle.svg">
        <div class="slogan">
          <span class="line">I MAKE</span>
          <span class="line">THINGS</span>
          <span class="line">HAPPEN</span>
        </div>
      </div>

      <img id="moon" alt="moon" src="@/assets/img/german_faller_moon.png">
      <img id="astronaut" alt="moon" src="@/assets/img/german_faller_astronaut_1.png">

    </div>
  </section>
</template>

<script>
export default {
  name: "home"
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


  #moon{
    position: absolute;
    width: 8rem;
    height: 8rem;
    right: 4rem;
    top: 6rem;
  }

  #astronaut{
    position: absolute;
    width: 10rem;
    height: 10rem;
    left: 4rem;
    bottom: 5rem;
  }

  @media (min-width: 768px) {
    //Small screens, laptops

    .logo {
      margin-top: 14rem;
    }

    #moon{
      right: 2rem;
      top: 12rem;
    }

    #astronaut{
      left: 6rem;
      bottom: 12rem;
    }
  }

}
</style>
