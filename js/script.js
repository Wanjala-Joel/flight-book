'use strict';

const account1 = {
  img: 'img/16.jpg',
  owner: 'Joel Nambala',
  cities: ['Nairobi', 'Nakuru', 'Kisumu'],
  county: 'Nairobi',
  email: 'joel@example.com',
  twitter: '@joelnambala',
  password: 1111,
  rating: 9,
  bookings: [],
  bookingTime: [],
};

const account2 = {
  img: 'img/32.jpg',
  owner: 'Evans Wanjala',
  cities: ['Nairobi', 'Mombasa', 'Kisumu'],
  county: 'Nairobi',
  email: 'evans@example.com',
  twitter: '@wanjalaevans',
  password: 2222,
  rating: 7,
  bookings: [],
  bookingTime: [],
};

const account3 = {
  img: 'img/44.jpg',
  owner: 'Halima Juma',
  cities: ['Nairobi', 'Mombasa'],
  county: 'Mombasa',
  email: 'juma@example.com',
  twitter: '@juma201',
  password: 3333,
  rating: 8,
  bookings: [],
  bookingTime: [],
};

const account4 = {
  img: 'img/john.jpg',
  owner: 'Jessica Akinyi',
  cities: ['Nairobi', 'Nakuru', 'Kisumu'],
  county: 'Kisumu',
  email: 'jessica@example.com',
  twitter: '@akinyi254',
  password: 4444,
  rating: 10,
  bookings: [],
  bookingTime: [],
};

const accounts = [account1, account2, account3, account4];

// Select DOM elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');

const btnLogIn = document.querySelector('.btn-login');
const logInUsername = document.querySelector('.input-login--username');
const logInPin = document.querySelector('.input-login--pin');

const appContainer = document.querySelector('.app');
const containerProfile = document.querySelector('.profile');
const destinationContainer = document.querySelector('.destination-container');
const historyContainer = document.querySelector('.history-list');

const btnBook = document.querySelector('.profile-button--book');
const btnLogOut = document.querySelector('.profile-button--logout');

const sectionBook = document.querySelector('.section-book');
const formInputDate = document.querySelector('.form-input--date');
const formInputTime = document.querySelector('.form-input--time');
const formInputFrom = document.querySelector('.form-input--from');
const formInputTo = document.querySelector('.form-input--to');
const formBtn = document.querySelector('.form-btn');

// State variables
let currentAccount;

///////////////////////////////////////////////////////
// Functions
const computeUsername = function (account) {
  account.forEach(function (acc, i) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
computeUsername(accounts);

const formarDate = function () {
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat('USD', {
    month: '2-digit',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);

  labelDate.textContent = formattedDate;
};
// formarDate();
setInterval(formarDate, 1000);

const formatTime = function (date) {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  return formattedTime;
};

const displayDetinations = function (account) {
  destinationContainer.innerHTML = '';
  account.forEach(function (city, i) {
    const html = `<p class="destination-name">${city}</p>`;

    destinationContainer.insertAdjacentHTML('afterbegin', html);
  });
};

const displayProfile = function (account) {
  containerProfile.innerHTML = '';
  labelWelcome.textContent = `Welcome back, ${account.owner.split(' ')[0]}`;
  const html = `
        <img src="${account.img}" alt="User profile" class="profile-img" />
        <p class="profile-name">
          <i class="fa-solid fa-user"></i><span>${account.owner}</span>
        </p>
        <a href="#" class="profile-link profile-link--email"
          ><i class="fa-solid fa-envelope"></i><span>${account.email}</span></a
        >
        <a href="#" class="profile-link profile-link--twitter"
          ><i class="fa-brands fa-twitter"></i><span>${account.twitter}</span></a
        >
        <p class="profile-county">
          <i class="fa-solid fa-location-dot"></i><span>${account.county}</span>
        </p>
        <p class="profile-rating">
          <i class="fa-solid fa-star"></i><span>${account.rating}</span>
        </p>
  `;

  containerProfile.insertAdjacentHTML('beforeend', html);
};

const displayHistory = function (account) {
  historyContainer.innerHTML = '';
  const history = account.bookings;

  if (history.length > 0) {
    history.forEach(function (item, i) {
      const bookingTime = account.bookingTime[i];

      const day = new Date(bookingTime);
      const displayDate = formatTime(day);

      const html = `<li class="history-item">On ${item.date}, you booked a flight from ${item.from} to ${item.destination} at ${item.time}.(${displayDate})</li>`;

      historyContainer.insertAdjacentHTML('afterbegin', html);
    });
  }

  if (history.length === 0) {
    const html = `<li class="history-item">Sorry! You do not have any flights. Book a flight to show your history here.....</li>.`;

    historyContainer.insertAdjacentHTML('afterbegin', html);
  }
};

// Events
// Log in event
btnLogIn.addEventListener('click', function (e) {
  e.preventDefault();
  const user = logInUsername.value;
  const pin = +logInPin.value;

  currentAccount = accounts.find(acc => acc.username === user);

  if (currentAccount.password === pin) {
    // Display the UI
    appContainer.style.opacity = 100;

    // Update the UI
    displayDetinations(currentAccount.cities);

    displayProfile(currentAccount);

    displayHistory(currentAccount);
  }

  // Clear the input field
  logInUsername.value = logInPin.value = '';
  logInPin.blur();
  logInUsername.focus();
});

// Booking event
btnBook.addEventListener('click', function (e) {
  e.preventDefault();

  sectionBook.classList.remove('hide');
});

// Flight booking event
formBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const date = formInputDate.value;
  const time = formInputTime.value;
  const from = formInputFrom.value;
  const to = formInputTo.value;

  if (date === '' && (time === '') & (from === '') & (to === '')) return;

  const summary = {
    date: date,
    time: time,
    from: from,
    destination: to,
  };

  const bookTime = new Date().toISOString();

  currentAccount.bookingTime.push(bookTime);
  currentAccount.bookings.push(summary);
  historyContainer.innerHTML = '';
  displayHistory(currentAccount);

  formInputDate.value =
    formInputTime.value =
    formInputFrom.value =
    formInputTo.value =
      '';

  sectionBook.classList.add('hide');
});

btnLogOut.addEventListener('click', function (e) {
  e.preventDefault();
  appContainer.style.opacity = 0;
  labelWelcome.textContent = 'Log in and get started';
});
