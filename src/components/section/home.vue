<template>
  <section id="home">

    <img id="banner" alt="banner" src="@/assets/img/german_faller_banner.webp">
    <img id="banner-cover" alt="banner_cover" src="@/assets/img/german_faller_banner_cover.svg">

    <div class="container">
      <img id="moon" alt="moon" src="@/assets/img/german_faller_moon.png">
      <img id="astronaut" alt="moon" src="@/assets/img/german_faller_astronaut_1.png">

      <div class="logo">
        <img alt="moon" src="@/assets/img/german_faller_circle.svg">
        <span class="line">I MAKE</span>
        <span class="line">THINGS</span>
        <span class="line">HAPPEN</span>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "home"
}
</script>

<style scoped lang="scss">
#home{

  #banner, #banner-cover  {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  #banner-cover{
    opacity: 0.6;
  }

  #moon{
    display: none;
    position: absolute;
    width: 175px;
    height: 175px;
    left: 1150px;
    top: 264px;
  }

  #astronaut{
    position: absolute;
    width: 178px;
    height: 172px;
    left: 200px;
    top: 573px;
  }

  .logo{
    $logo-size: 473px;

    position: absolute;
    width: $logo-size;
    height: $logo-size;
    left: calc(50% -  #{$logo-size} / 2);

    top: 330px;

    img{
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .line{
      position: absolute;
      height: 289px;

      font-style: normal;
      font-weight: 800;
      font-size: 72px;
      line-height: 84px;

      white-space: pre;

      left: 63%;

      &:nth-child(2) {
        top: 42%;
      }
      &:nth-child(3) {
        top: 61%;
      }
      &:nth-child(4) {
        top: 80%;
      }
    }

  }

  #slogan{
    position: absolute;
    width: 100%;
    top: 400px;

    .line{
      display: block;
      height: 289px;

      font-style: normal;
      font-weight: 800;
      font-size: 72px;
      line-height: 84px;
      text-align: end;
    }
  }

  #circle{
    position: absolute;
    width: 473px;
    height: 473px;
    left: calc(50% - 473px/2);
    top: 330px;
  }

  @media (min-width: 1440px) {
    #moon{display: inline}
  }

  .container{
    height: 95vh;
  }
}
</style>
