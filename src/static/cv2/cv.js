document.addEventListener("DOMContentLoaded", async function () {

  const data = await fetch('data.json').then((response) => response.json());
  console.log(data);

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


  fillList("objetiveList", data.objetives);
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
    legalNameElement = exp.legalName ? "<small>(" + exp.legalName + ")</small>" : ""

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

    legalNameElement = exp.legalName ? "<small style='text-wrap: nowrap;'>(" + exp.legalName + ")</small>" : ""
    tList = exp.tasks.map(t => `<li>${t}</li>`).join("")


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


});


