document.addEventListener("DOMContentLoaded", function () {
    const data = {
        "name": "Germán Faller",
        "summary": "German has more than 10 years working on all the development cycle collaborating with IT and business partners to design, develop, and troubleshoot end-to-end technical solutions. More than two years leading teams; his main expertise is in the JAVA stack with its different frameworks; also has experience in NodeJs, Vue, DevOps, cloud, and Kubernetes and really loves knowledge. He is passionate about software development and has the ability to work under pressure in interdisciplinary teams with the capacity to face and overcome constant challenges.",

        "address": "Artigas 1122, 75100 Dolores Soriano Uruguay",
        "mail": "german@faller.com.uy",
        "phone": "+59898937326",

        "objetives":[
          "Expand and Deepen Technical Knowledge",
          "Develop Leadership and Project Management Skills",
          "Foster Innovation and Creativity in Software Development"
        ],

        "technologies": [
          "AWS",
          "Docker",
          "Kubernetes",
          "CI/CD",
          "Microservices",
          "Micro Frontend",
          "NodeJS",
          "ReactJS",
          "Vue",
          "Angular",
          "Spring-Boot",
          "Express",
          "Hibernate",
          "Git",
          "Gitlab",
          "Postgres",
          "MongoDB",
          "MySQL",
          "SQLServer",
          "Scrum",
          "Kanban",
          "Swagger",
          "Cloud Foundry",
          "Jira",
          "DevOps",
          "JAVAEE",
          "JPA",
          "EJB"
        ],

        "experience": [
          {
            "company": "Favor Delivery",
            "legalName": null,
            "role": "Backend Developer",
            "startDate": "29/01/2024",
            "endDate": "04/10/2024",
            "tasks":[
              "Infrastructure Updates.",
              "Integration Testing for Legacy Application.",
              "Creation and Maintenance of Endpoints for a Menu Microservice.",
              "Discussions on Marketing Strategies.",
            ]
          },
          {
            "company": "SOFIS S.R.L.",
            "legalName": null,
            "role": "Technical Leader",
            "startDate": "15/08/2023",
            "endDate": "04/10/2023",
            "tasks":[
              "Gather requirements.",
              "System Design and Integration using Structurizr.",
              "Manage the team and its needs.",
              "Follow customer needs.",
              "Sell solutions to current customers.",
            ]
          },
          {
            "company": "Perficient",
            "legalName": "SOFT OA S.R.L.",
            "role": "Senior Backend Developer",
            "startDate": "21/02/2022",
            "endDate": "31/07/2023",
            "tasks":[
              "Write code according to the best practices.",
              "Suggest a design for the features given by the analyst.",
              "Design the contracts and the solution for the given task.",
              "Writing unit testing for the delivered code.",
              "Collaborate in the sprint ceremonies.",
            ]
          },
          {
            "company": "BASF Services Americas S.R.L.",
            "legalName": null,
            "role": "Software Developer Specialist",
            "startDate": "11/11/2019",
            "endDate": "16/02/2022",
            "tasks":[
              "Design the systems.",
              "Moderate/Collaborate in the sprint ceremonies.",
              "Research third-party solutions to be integrated on the source.",
              "Review code from the rest of the team.",
              "Design the career path for the team.",
            ]
          },
          {
            "company": "ANTEL",
            "legalName": null,
            "role": "System Analyst",
            "startDate": "04/03/2019",
            "endDate": "08/11/2019",
            "tasks":[
              "Design continuous integration pipelines and scripts.",
              "Write automation tests.",
              "Create a back-office web to manage system transactions.",
              "Integrate 3rd party services by b2b and w2w.",
              "Write Swagger YAML.",
            ]
          },
          {
            "company": "Urudata Software",
            "legalName": "ITX S.A.",
            "role": "Senior Developer",
            "startDate": "02/05/2018",
            "endDate": "12/11/2018",
            "tasks":[
              "Maintaining 3rd party applications.",
              "Collaborate in the sprint ceremonies.",
              "Develop new endpoints.",
              "Writing unit testing for the delivered code.",
              "Talk with internal business partners to understand their needs.",
            ]
          },
          {
            "company": "ANTEL",
            "legalName": null,
            "role": "System Analyst",
            "startDate": "07/04/2014",
            "endDate": "27/04/2018",
            "tasks":[
              "Design continuous integration pipelines and scripts.",
              "Write automation tests.",
              "Create a back-office web to manage system transactions.",
              "Integrate 3rd party services by b2b and w2w.",
              "Write Swagger YAML.",
            ]
          },
        ],
        "education": [
          {
            "degree": "Computer Engineering",
            "institute": "Universidad de la Republica",
            "completion": "2021"
          },
        {
            "degree": "Computer Science Bachelor",
            "institute": "Universidad de la Republica",
            "completion": "2019"
          },
          {
            "degree": "Computer Analyst",
            "institute": "Universidad de la Republica",
            "completion": "2018"
          },
          {
            "degree": "Ethical Hacking and Incident Management",
            "institute": "ORT Uruguay",
            "completion": "2019"
          }
        ],
        "personal":{
          "dateOfBirth":"19/02/1993",
          "maritalStatus":"Single",
          "nationality":"Uruguayan",
          "languages":["Spanish","English"],
          "passportNumber":"D252910",
          "passportExpiryDate":"19/02/2029",
        },
        "references":[
          {
            "name":"Santiago Ingold",
            "contact":"https://www.linkedin.com/in/experto-ciber/",
            "relation":"University",
          },
          {
            "name":"Matt Voytko",
            "contact":"https://www.linkedin.com/in/matt-voytko-01794418/",
            "relation":"Perficient",
          },
          {
            "name":"Fred Lintz",
            "contact":"https://www.linkedin.com/in/fred-lintz/",
            "relation":"Client",
          },
          {
            "name":"Rachel Ramones",
            "contact":"https://www.linkedin.com/in/rachel-ramones-a62120105/",
            "relation":"Client",
          },
          {
            "name":"Danica Villalobos",
            "contact":"https://www.linkedin.com/in/danica-faye-villalobos-77a09a22b/",
            "relation":"Friend",
          },
          {
            "name":"Diego Gavilanes",
            "contact":"https://www.linkedin.com/in/diego-gavilanes-azambuya/",
            "relation":"Antel",
          },
        ]
      };

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
    document.getElementById("phone").href = "tel:"+data.phone;
    document.getElementById("mail").textContent = data.mail;
    document.getElementById("mail").href = "mailto:"+data.mail;


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
      legalNameElement=exp.legalName?"<small>(" + exp.legalName + ")</small>":""

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

  legalNameElement = exp.legalName?"<small style='text-wrap: nowrap;'>(" + exp.legalName + ")</small>":""
  tList = exp.tasks.map(t=>`<li>${t}</li>`).join("")


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


