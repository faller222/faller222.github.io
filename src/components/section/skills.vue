<template>
  <section id="skills">
    <img id="banner-cover" alt="banner_cover" src="@/assets/img/german_faller_banner_cover.svg">

    <div class="title">
      <div class="container">
        <h2>SKILLS</h2>
        <img id="saturn" alt="saturn" src="@/assets/img/german_faller_saturn.svg">
      </div>
    </div>


    <div class="container">
      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
        literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
        College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
        going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
        comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
        The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>

      <div class="cards">
        <div class="card" v-for="g in skills">
          <p v-for="s in g">{{s}}</p>
        </div>
      </div>

      <img id="telescope" alt="telescope" src="@/assets/img/german_faller_telescope.svg">
    </div>
  </section>
</template>

<script>
const skills = [
  ['Angular', 'Bower', 'Camel', 'Camunda', 'CI/CD', 'Cloud Foundry', 'Docker', 'Docker-compose', 'EJB', 'Express'],
  ['Fuse services works','Genexus','Git','Gitlab','Grunt','Hibernate','Infinispan','JAVAEE','jBoss','JBPM kie-Server'],
  ['Jira','JMS','JSF','JPA','Kanban','Karaf','Kubernetes','Mercurial','MongoDB','MySQL'],
  ['NodeJS','Nuxt','OutSytems','OSGI','Postgres','Primefaces','ReactJS','Richfaces','SAP CAI','Scala'],
  ['Scrum','Scrumban','Sequelize','Solr','Spring-Boot','SQLServer','SVN','Swagger','SwitchYard','Vaadin'],
  ['Vagrant','Vue','Vuex','Watson','Web sockets','WildFly','WS-Addressing','WS-RESTful','WS-Security','WS-SOAP']]
export default {
  name: "skills",
  computed:{
    skills() {
      return skills
    }
  }
}
</script>

<style lang="scss" scoped>
#skills {
  padding-top: 1rem;
  overflow: visible;

  #banner-cover {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;

    opacity: 0.6;
    z-index: -1;
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

      #saturn {
        position: absolute;
        right: 2rem;
        top: -3.5rem;
        width: 9rem;
        height: 9rem;
      }
    }

  }

  .container{
    padding-bottom: 10rem;

    p {
      padding-left: 4rem;
      padding-right: 4rem;
    }

    .cards {
      margin-left: 4rem;
      margin-right: 4rem;

      display: flex;

      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: scroll;

      .card{
        //width: calc( 33% - 2rem );
        flex: 0 0 calc( 33% - 2rem );
        //margin-bottom: 1rem;

        display: block;
        background-color:  #FFFFFF;
        color: #002C23;
        padding: 2rem;

        p{
          padding: 0;
          text-align: center;
        }

        &:first-child {
          border-radius: 1rem 0 0 0;
        }

        &:last-child {
          border-radius: 0 1rem 0 0;
        }
      }
    }

    #telescope {
      position: absolute;
      width: 15rem;
      height: 15rem;
      left: 0.5rem;
      bottom: 2rem;
    }
  }

  @media (min-width: 768px) {
    //Small screens, laptops
    .content {
      flex-direction: row;
    }

    .container {
      position: relative;

      .cards {
        flex-wrap: wrap;

        .card {
          margin-left: 1rem;
          margin-right: 1rem;
          margin-bottom: 1rem;

          padding: 3rem;
          border-radius: 0;

          &:first-child {
            border-radius: 1rem 0 0 0;
          }

          &:nth-child(3) {
            border-radius: 0 1rem 0 0;
          }

          &:nth-child(4) {
            border-radius: 0 0 0 1rem;
          }

          &:last-child {
            border-radius: 0 0 1rem 0;
          }
        }
      }
    }
  }
}
</style>
