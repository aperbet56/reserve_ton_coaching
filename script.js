// Récupération des éléments HTML5
const dateInput = document.querySelector("#booking__date");
const slotsContainer = document.querySelector("#slots__container");
const bookingForm = document.querySelector("#booking__form");
const submitBtn = document.querySelector("#submit__btn");
const appointmentsList = document.querySelector("#appointments__list");
const copyrightYear = document.querySelector(".year");

// Configuration des horaires du coach dans des constantes
const startHour = 8; // 08:00
const endHour = 20; // 20:00 (Fin de la dernière séance)

// Création des variables selectedDate et selectedSlot
let selectedDate = "";
let selectedSlot = "";

// La méthode toISOString() retourne une chaîne de caractères représentant cette date au format chaîne de date-heure
const today = new Date().toISOString().split("T");
// console.log(today);
dateInput.min = today[0]; // Sécuriser la date minimale (Aujourd'hui)

// Initialisation du localStorage : récupération des rendez-vous existants ou création d'un tableau vide
let appointments = JSON.parse(localStorage.getItem("coachAppointments")) || [];

// Déclaration de la fonction getCurrentYear qui va permettre l'affichage dynamique de l'année dans le footer
const getCurrentYear = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  copyrightYear.textContent = `${currentYear}`;
};

// Appel de la fonction getCurrentYear()
getCurrentYear();

// Déclaration de la fonction formatDate qui va permettre d'afficher les dates au format français (JJ/MM/AAAA)
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

// Déclaration de la fonction checkFormValidity pour activer/désactiver le bouton "Confirmer mon rendez-vous" selon si une date et un créneau ont été choisi
const checkFormValidity = () => {
  submitBtn.disabled = !(selectedDate && selectedSlot);
};

// Déclaration de la fonction displayAppointments qui va permettre d'afficher la liste des rendez-vous enregistrés
const displayAppointments = () => {
  // Si aucun rdv
  if (appointments.length === 0) {
    appointmentsList.innerHTML =
      '<p class="info__text">Aucun rendez-vous programmé pour le moment.</p>';
    return;
  }

  // Trier par date et ensuite par heure les rdv avec la méthode sort()
  appointments.sort(
    // La méthode localeCompare() renvoie un nombre indiquant si la chaîne de caractères courante se situe avant, après ou est la même que la chaîne passée en paramètre.
    (a, b) => a.date.localeCompare(b.date) || a.slot.localeCompare(b.slot)
  );

  //appointmentsList.innerHTML = "";
  // Pour chaque rdv
  appointments.forEach((appointment) => {
    // Création de l'élément HTML <div>
    const item = document.createElement("div");
    item.className = "appointment__item";
    // Mise en place de la structure HTML
    item.innerHTML = `
                <div class="appointment__info">
                    <h3>${appointment.name} - ${appointment.goal}</h3>
                    <p><i class="fa-solid fa-calendar-week"></i> Le ${formatDate(
                      appointment.date
                    )} de <strong>${appointment.slot} à ${
      parseInt(appointment.slot) + 1
    }:00</strong></p>
                    <p><i class="fa-solid fa-envelope"></i> ${
                      appointment.email
                    }</p>
                    <p><i class="fa-solid fa-phone"></i> ${
                      appointment.phone
                    } </p>
                </div>
                <button class="cancel__btn" data-id="${
                  appointment.id
                }">Annuler</button>
            `;

    // Ecoute de l'événement "click" pour le bouton Annuler
    item.querySelector(".cancel__btn").addEventListener("click", (e) => {
      const idToDelete = e.target.getAttribute("data-id");
      // Sélection des rdv à conserver avec la méthode filter et suppression du rdv souhaité avec la logique inversée !==
      appointments = appointments.filter((a) => a.id !== idToDelete);
      // Mise à jour du LocalStorage
      localStorage.setItem("coachAppointments", JSON.stringify(appointments));

      // Appel de la fonction displayAppointments()
      displayAppointments();
      // Condition if
      if (selectedDate) generateTimeSlots(); // Appel de la fonction generateTimeSlots() +  Libère le créneau visuellement
    });
    // Ajout dela div créée dans le DOM
    appointmentsList.appendChild(item);
  });
};

// Déclaration de la fonction generateTimeSlots qui va permettre de créér les créneaux horaires pour les rdv
const generateTimeSlots = () => {
  // slotsContainer.innerHTML = "";

  const bookedSlots = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .map((appointment) => appointment.slot);

  // Création de la variable index qui va servir de ompteur pour créer le décalage progressif
  let index = 0;

  // Boucle for
  for (let hour = startHour; hour < endHour; hour++) {
    const timeString = `${hour.toString().padStart(2, "0")}:00`;
    // console.log(timeString);
    // Création de l'élément HTML5 <button>
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slot__btn";
    button.textContent = `${timeString}`;

    // On injecte l'index dans la variable CSS --DELAY pour la cascade des boutons
    index++; // Incrémentation de l'index

    if (bookedSlots.includes(timeString)) {
      button.disabled = true;
    }

    // Ecoute de l'événement "click" sur le bouton
    button.addEventListener("click", () => {
      // Récupération de tous les éléments HTML ayant la classe "slot__btn"
      document
        .querySelectorAll(".slot__btn")
        .forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedSlot = `${timeString}`;
      // Appel de la fonction checkFormValidity()
      checkFormValidity();
    });

    // Ajout de button dans le DOM
    slotsContainer.appendChild(button);
  }
};

// Appel de la fonction displayAppointments()
displayAppointments();

generateTimeSlots();
