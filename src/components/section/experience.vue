<template>
  <section id="experience">
    <div class="title">
      <div class="container">
        <h2>WORK EXPERIENCE</h2>
        <img id="rocket" alt="rocket" src="@/assets/img/german_faller_rocket.svg">
      </div>
    </div>
    <div class="container content">

      <a href="/Curriculum%20Vitae%20-%20German%20Faller%20EN.pdf" download="" class="btn-contact">Download resume</a>
    </div>


<!--    <div class="title">-->
<!--      <div class="container">-->
<!--        <h2>ACADEMIC EXPERIENCE</h2>-->
<!--        <img id="astronaut_saturn" alt="astronaut_saturn" src="@/assets/img/german_faller_astronaut_saturn.svg">-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="container content">-->

<!--      Work in Progress-->
<!--    </div>-->
  </section>
</template>

<script>
export default {
  name: "experience"
}
</script>

<style lang="scss" scoped>
#experience {
  background-color: #FFFFFF;
  color: #000000;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;

    #german {
      height: 16rem;
      width: 16rem;
      margin: 1rem;
    }

    #info {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 100%;
      justify-content: space-evenly;
    }

    p {
      padding: 0 1.5rem;
    }

    .social {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      padding: 20px;

      a img {
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

      #astronaut_saturn,
      #rocket {
        position: absolute;
        right: 4rem;
        top: -3.5rem;
        width: 12rem;
        height: 12rem;
      }
    }
  }
}
</style>
