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
    $logo-size: 24rem;
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
      top: 10rem;
      left: 15rem;

      .line {
        font-size: 3.5rem;
        line-height: 4.5rem;

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
    top: 5rem;
  }

  #astronaut{
    position: absolute;
    width: 10rem;
    height: 10rem;
    left: 4rem;
    bottom: 5rem;
  }

  //
  //.logo{
  //  user-select: none;
  //
  //  $logo-size: 473px;
  //
  //  position: absolute;
  //  width: $logo-size;
  //  height: $logo-size;
  //  left: calc(50% -  #{$logo-size} / 2);
  //
  //  top: 330px;
  //
  //  img{
  //    position: absolute;
  //    height: 100%;
  //    width: 100%;
  //  }
  //
  //  .line{
  //    position: absolute;
  //    height: 289px;
  //
  //    font-style: normal;
  //    font-weight: 800;
  //    font-size: 72px;
  //    line-height: 84px;
  //
  //    white-space: pre;
  //
  //    left: 63%;
  //
  //    &:nth-child(2) {
  //      top: 42%;
  //    }
  //    &:nth-child(3) {
  //      top: 61%;
  //    }
  //    &:nth-child(4) {
  //      top: 80%;
  //    }
  //  }
  //
  //}
  //
  //#slogan{
  //  position: absolute;
  //  width: 100%;
  //  top: 400px;
  //
  //  .line{
  //    display: block;
  //    height: 289px;
  //
  //    font-style: normal;
  //    font-weight: 800;
  //    font-size: 72px;
  //    line-height: 84px;
  //    text-align: end;
  //  }
  //}
  //
  //#circle{
  //  position: absolute;
  //  width: 473px;
  //  height: 473px;
  //  left: calc(50% - 473px/2);
  //  top: 330px;
  //}

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
