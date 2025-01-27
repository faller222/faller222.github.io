<template>
  <div class="dark">
    <div id="basic">

      <a :href="data.basic.gitHubURL" target="_blank">
        <i class="fab fa-github"></i> {{ data.basic.gitHubURL }}
      </a>
      <a :href="data.basic.linkedInURL" target="_blank">
        <i class="fab fa-linkedin"></i> {{ data.basic.linkedInURL }}
      </a>
      <a :href="'mailto:'+data.basic.email">
        <i class="fas fa-envelope"></i> {{ data.basic.email }}
      </a>
      <a :href="data.basic.addressUrl" target="_blank">
        <i class="fas fa-map-marker-alt"></i> {{ data.basic.address }}
      </a>
      <a :href="'tel:'+ data.basic.phone">
        <i class="fas fa-phone"></i> {{ data.basic.phone }}
      </a>
      <a :href="data.basic.web" target="_blank">
        <i class="fas fa-globe"></i> {{ data.basic.web }}
      </a>
    </div>

    <optional-div>
      <br>
      {{ data.basic.firstName }}<br>
      {{ data.basic.lastName }}<br>
    </optional-div>


  </div>

</template>


<script setup lang="ts">
import data from '@/data/new.json'
import OptionalDiv from "~/components/optionalDiv.vue";


</script>

<style lang="scss">
.dark {
  padding: 3mm;
  background-color: var(--primary-color);
  color: white;
}

#basic {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  //gap: 15px;
}

#basic a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  line-height: 1.5;
}

#basic i {
  font-size: 18px;
  color: inherit;
}
</style>