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

// Déclaration de la fonction fléchée formatDate qui va permettre d'afficher les dates au format français (JJ/MM/AAAA)
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

// Appel de la fonction formatDate()
formatDate();
