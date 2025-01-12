<template>
  <div class="container">
    <div class="section" id="profile">
      <h1 id="name"></h1>
      <div id="info">
        <span id="address"></span>|<a id="phone"></a>|<a id="mail"></a>
      </div>
      <p id="summary"></p>
    </div>

    <div class="section" id="objective">
      <h2>Objectives</h2>
      <ul id="objectiveList"></ul>
    </div>

    <div class="section" id="technologies">
      <h2>Skills & Technologies</h2>
      <ul id="technologyList"></ul>
    </div>

    <div class="section" id="experience">
      <h2>Experience</h2>
    </div>

    <div class="section" id="tasks">
      <h2 style="grid-column: span 2">Task & Duties</h2>
    </div>

    <div class="section" id="education">
      <h2 style="grid-column: span 3">Education</h2>
    </div>

    <div class="section" id="personal">
      <h2>Personal Details</h2>
    </div>

    <div class="section" id="references">
      <h2 style="grid-column: span 3">References</h2>
    </div>
  </div>
</template>


<script setup>

import data from '@/data/faller.json'

onBeforeMount(() => {

// Rellenar listas
  const fillList = (listId, items) => {
    const listElement = document.getElementById(listId);
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      listElement.appendChild(li);
    });
  };

// Rellenar información del perfil
  document.getElementById("name").textContent = data.name;
  document.getElementById("summary").textContent = data.summary;

  document.getElementById("address").textContent = data.address;
  document.getElementById("phone").textContent = data.phone;
  document.getElementById("phone").href = "tel:" + data.phone;
  document.getElementById("mail").textContent = data.mail;
  document.getElementById("mail").href = "mailto:" + data.mail;


  fillList("objectiveList", data.objectives);
  fillList("technologyList", data.technologies);


  // Rellenar experiencia profesional
  const experienceElem = document.getElementById("experience")
  const li = document.createElement("div");
  experienceElem.appendChild(li);

  li.innerHTML = `
    <strong>Company Name</strong>
    <strong>Designation</strong>
    <strong style="grid-column: span 2">Duration (dd/mm/yyyy)</strong>
    <strong></strong>
    <strong></strong>
    <strong>Start Date</strong>
    <strong>End Date</strong>
    `;

  data.experience.forEach(exp => {
    let legalNameElement = exp.legalName ? "<small>(" + exp.legalName + ")</small>" : ""

    li.innerHTML += `
      <span>${exp.company} ${legalNameElement}</span>
      <i>${exp.role}</i>
      <span>${exp.startDate}</span>
      <span>${exp.endDate}</span>
      `;
  });


// Rellenar experiencia profesional
  const tasksElem = document.getElementById("tasks")
  data.experience.forEach(exp => {

    let legalNameElement = exp.legalName ? "<small style='text-wrap: nowrap;'>(" + exp.legalName + ")</small>" : ""
    let tList = exp.tasks.slice(0, 4).map(t => `<li>${t}</li>`).join("")


    tasksElem.innerHTML += `
  <b>${exp.company} ${legalNameElement}</b>
  <ul>${tList}</ul>
  `;
  });

// Rellenar educacion
  const educationElem = document.getElementById("education")
  data.education.forEach(ed => {
    educationElem.innerHTML += `
    <b>${ed.degree}</b>
    <i>${ed.institute}</i>
    <span>${ed.completion}</span>
    `;
  });


  const personalElem = document.getElementById("personal")
  personalElem.innerHTML += `
<ul>
<li><b>Date of Birth (dd/mm/yyyy):</b>${data.personal.dateOfBirth}</li>
<li><b>Nationality:</b>${data.personal.nationality}</li>
<li><b>Languages:</b>${data.personal.languages.join(", ")}</li>
<li><b>Marital Status:</b>${data.personal.maritalStatus}</li>
<li><b>Passport Number:</b>${data.personal.passportNumber}</li>
<li><b>Passport Expiry Date (dd/mm/yyyy)</b>${data.personal.passportExpiryDate}</li>
</ul>`;

// Rellenar referencias
  const referencesElem = document.getElementById("references")
  data.references.forEach(ref => {
    referencesElem.innerHTML += `
    <b>${ref.name}</b>
    <i>(${ref.relation})</i>
    <a target="_blank" href='${ref.contact}'>${ref.contact}</i>
    `;
  });
})


</script>

<style>
@media print {
  section {
    padding-top: 30px;
  }
}

.container {
  width: 80%;
  margin: auto;
  padding: 20px;
}

.section {
  margin-bottom: 20px;
  page-break-inside: avoid;
}

.section h1,
.section h2 {
  margin-bottom: 5px;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
}

.section ul {
  list-style: none;
  padding: 0;

}

.section ul li {
  margin-bottom: 10px;
}

#info {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  font-size: small;
  margin-right: 30px;
}

a {
  text-decoration: none;
  color: #000;
}

#summary {
  text-align: justify;
}

#objective ul {
  list-style: "- ";
  padding-left: 30px;

}

#technologies ul {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  list-style-type: none;
  padding: 0;
}

#experience div {
  display: grid;
  gap: 7px;
  grid-template-columns: auto auto 1fr 1fr;
}

#tasks {
  display: grid;
  gap: 10px;
  row-gap: 20px;
  grid-template-columns: 1fr auto;
  margin-bottom: 0;
}

#tasks ul {
  margin: 0;
  list-style: "- ";
}

#education {
  display: grid;
  gap: 10px;
  row-gap: 20px;
  grid-template-columns: 1fr auto auto;
}

#personal {
  padding-top: 20px;
}

#personal h2 {
  margin-bottom: 15px;
}

#personal b {
  padding-left: 15px;
  padding-right: 10px;
  padding-top: 5px;
}

#references {
  display: grid;
  gap: 10px;
  row-gap: 20px;
  grid-template-columns: auto auto auto;
}

</style>