<template>
  <div id="home">

    <img id="banner" alt="banner" src="@/assets/img/german_faller_banner.webp">
    <img id="banner-cover" alt="banner_cover" src="@/assets/img/german_faller_banner_cover.svg">

    <div class="container">
      <img id="moon" alt="moon" src="@/assets/img/german_faller_moon.png">
      <img id="astronaut" alt="moon" src="@/assets/img/german_faller_astronaut_1.png">

      <div id="slogan">
        <div>
          I MAKE <br>
          THINGS <br>
          HAPPEN
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style scoped lang="scss">
#home{
  position: relative;
  height: 90vh;

  #banner, #banner-cover  {
    position: absolute;
    top: 0;
    height: 90vh;
    width: 100%;
    object-fit: cover;
  }

  #banner-cover{
    opacity: 0.6;
  }

  #moon{
    display: none;
    position: relative;
    width: 175px;
    height: 175px;
    left: 1150px;
    top: 264px;
  }

  #astronaut{
    position: relative;
    width: 178px;
    height: 172px;
    left: -20px;
    top: 573px;
  }

  #slogan{
    position: relative;
    top: 200px;
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

  @media (min-width: 1440px) {
    #moon{display: inline}
  }

  .container{
    height: 90vh;
  }
}



</style>
