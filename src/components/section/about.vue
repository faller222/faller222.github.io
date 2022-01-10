<template>
  <section id="about">

    <div class="name" style="text-align: end;">
      <div>
        <h1>ABOUT ME</h1>
      </div>
    </div>

    <div class="container">
      <img id="astronaut" alt="moon" src="@/assets/img/german_faller_astronaut_2.png">

        Work in Progress
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

  #astronaut{
    position: absolute;
    width: 323px;
    height: 277px;
    right: 200px;
    top: -240px;

  }
}
</style>
