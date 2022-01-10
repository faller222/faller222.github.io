<template>
  <section id="home">

    <img id="banner" alt="banner" src="@/assets/img/german_faller_banner.webp">
    <img id="banner-cover" alt="banner_cover" src="@/assets/img/german_faller_banner_cover.svg">

    <div class="container">
      <img id="moon" alt="moon" src="@/assets/img/german_faller_moon.png">
      <img id="astronaut" alt="moon" src="@/assets/img/german_faller_astronaut_1.png">

      <img id="circle" alt="moon" src="@/assets/img/german_faller_circle.svg">
      <div id="slogan">
<!--        <div style="text-align: end;">-->
<!--          I MAKE <br>-->
<!--          THINGS <br>-->
<!--          HAPPEN-->
<!--        </div>-->
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
    height: 95vh;
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

  #slogan{
    position: absolute;
    width: 100%;
    top: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: end;


    div{
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
