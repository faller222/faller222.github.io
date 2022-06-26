<template>
  <section id="experience">
    <div class="title">
      <div class="container">
        <h2>WORK EXPERIENCE</h2>
        <img id="rocket" alt="rocket" src="@/assets/img/german_faller_rocket.svg">
      </div>
    </div>
    <div class="container">


      <article class="xp" v-for="item in xp">
        <div class="date">{{item.from}} - {{item.to}}</div>
        <div class="title">{{item.project}}, {{item.company}}, {{item.location}}, {{item.level}}</div>
        <div class="description">{{item.description}}</div>
        <div class="tech">
          <h4>Technologies:</h4>
          {{item.technologies.join(', ')}}
        </div>
      </article>


      <a href="/Curriculum%20Vitae%20-%20German%20Faller%20EN.pdf" download="" class="btn">Download resume</a>
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
import {xp} from '@/common/xp'

export default {
  name: "experience",
  data() {
    return {xp: xp.slice().reverse()}
  }
}
</script>

<style lang="scss" scoped>
#experience {
  background-color: #FFFFFF;
  color: #000000;
  display: flex;
  flex-direction: column;

  .xp {
    padding: 1rem;

    .date {
      font-weight: 700;
    }

    .title {
      background-color: inherit;
      color: inherit;
    }

    .tech {
      h4 {
        margin-bottom: 0;
        margin-top: 0.5rem;
      }
    }
  }

  .btn {
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

  @media print {

    article {
      break-inside: avoid-page;
      display: inline-block;
      width: 100%;
    }

    .btn {
      display: none;
    }
  }
}
</style>
