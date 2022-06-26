<template>
<footer>
  <div class="msg">
    made with <img id="heart" alt="heart" src="@/assets/img/hibiscus_heart.svg"> at <a href="https://hibiscus.com.uy/" target="_blank"><img id="hibiscus" alt="hibiscus logo" src="@/assets/img/hibiscus_off_white.svg"></a>
  </div>
</footer>
</template>

<script>
export default {
  name: "MyFooter"
}
</script>

<style scoped lang="scss">
footer {
  background-color: #002C23;
  color: #F8F8F8;

  height: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .msg {
    font-size: 0.8rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 11rem;

    img {
      height: 1rem;
    }

    #hibiscus {
      height: 2rem;
    }
  }
}
</style>
