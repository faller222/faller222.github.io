<template>
  <button class="print-button" onclick="window.print()">Print</button>
</template>

<style scoped lang="scss">
.print-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}


@media print {
  .print-button {
    display: none;
  }
}


</style>