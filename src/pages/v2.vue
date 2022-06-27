<template>
  <div>
    <header>
      This is header
    </header>
    <nav>
      This is Navbar
    </nav>
    <section>
      <div class="body">
        <h1>Home</h1>
        <div class="content">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and
          going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </div>
      </div>
    </section>
    <section>
      <div class="body">
        <h1>About</h1>
        <div class="content">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and
          going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </div>
      </div>
    </section>
    <section>
      <div class="body">
        <h1>Skills</h1>
        <div class="content">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and
          going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </div>
      </div>
    </section>
    <section>
      <div class="body">
        <h1>Experience</h1>
        <div class="content">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and
          going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </div>
      </div>
    </section>
    <section>
      <div class="body">
        <h1>Contact</h1>
        <div class="content">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and
          going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
          Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
          Renaissance.
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </div>
      </div>
    </section>

    <footer>
      This is footer
    </footer>
  </div>
</template>

<script>
export default {
  name: "v2"
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

@import "normalize.css";
@import "@/assets/css/responsive.scss";

* {
  font-family: Roboto, sans-serif;
  box-sizing: border-box;

  scrollbar-width: thin;
  scrollbar-color: #00FFCE #002C23;

  &::selection {
    background-color: #00FFCE;
    color: #002C23;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00FFCE;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #C4C4C4;
  }

  &::-webkit-scrollbar-track {
    box-shadow: 0 0 1px #C4C4C4 inset;
  }

  section {

    border: 1px red solid;

    position: relative;
    min-height: 95vh;
    padding: 4rem 0 0;
    overflow: hidden;
    display: flex;

    .body {
      border: 1px blue solid;
      flex-grow: 1;

      h1 {
        background: #002C23;
        color: #FFFFFF;

        padding: 2rem;
        margin: 2rem 0;
        font-weight: 700;
      }
    }

    &:nth-child(even) {
      background: #FFFFFF;

      .body {
        background: #002C23;
        color: #FFFFFF;
      }
    }

    &:nth-child(odd) {
      background: #002C23;

      .body {
        background: #FFFFFF;
        color: #000000;
      }
    }

  }
}


@media print {
  section {
    page-break-before: always;
    display: block;

    background: #FFFFFF;

    h2 {
      background: #FFFFFF;
      color: #002C23;
    }

    .content {
      background: #FFFFFF;
      color: #000000 !important;
    }
  }
  nav {
    display: none;
  }
}
</style>
