// Récupération des éléments HTML5
const dateInput = document.querySelector("#booking__date");
const slotsContainer = document.querySelector("#slots__container");
const bookingForm = document.querySelector("#booking__form");
const submitBtn = document.querySelector("#submit__btn");
const appointmentsList = document.querySelector("#appointments__list");
const copyrightYear = document.querySelector(".year");

// Déclaration de la fonction getCurrentYear qui va permettre l'affichage dynamique de l'année dans le footer
const getCurrentYear = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  copyrightYear.textContent = `${currentYear}`;
};

// Appel de la fonction getCurrentYear()
getCurrentYear();
