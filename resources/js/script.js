'use strict';

const flight = {
  flightName: 'Joe Wen Airways',
  iataCode: 'KQ',
  customers: [],
  bookings: [],
  users(name, email, password) {
    return this.customers.push({
      userName: name,
      userEmail: email,
      userPassword: password,
    });
  },
  book(name, seat, from, destination, time = '08:00hrs') {
    return this.bookings.push({
      customerName: name,
      seatNumber: seat,
      currentCity: from,
      destination: destination,
      time: time,
    });
  },
};

//////////////////////////////////////////////////////
// Select DOM elements
// Create an account
const userNameCreate = document.querySelector('.user--name');
const userEmailCreate = document.querySelector('.user--email');
const userPasswordCreate = document.querySelector('.user--password');
const btnSignUp = document.querySelector('.btn-sign-up');

// Log in
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const btnSignIn = document.querySelector('.btn-sign-in');

// Book a flight
const userNameBook = document.querySelector('.user-name');
const flightName = document.getElementById('flight-name');
const seatNumber = document.querySelector('.seat-number');
const currentCity = document.querySelector('.current-city');
const destination = document.querySelector('.destination');
const btnBook = document.querySelector('.btn--book');

// Messages
const alertMessage = document.querySelector('.alert-message');
const bookMessage = document.querySelector('.book-message');
const bookMessageDanger = document.querySelector('.book-message-danger');

const formBookFlight = document.querySelector('.form-book-flight');

//////////////////////////////////////////////////////////////
// Add event listeners
btnSignUp.addEventListener('click', function (e) {
  e.preventDefault();
  // Check the credentials
  if (
    userNameCreate !== '' &&
    userEmailCreate !== '' &&
    userPasswordCreate !== ''
  ) {
    // Get the user data and add to customers array
    flight.users(
      userNameCreate.value,
      userEmailCreate.value,
      Number(userPasswordCreate.value)
    );
  } else if (
    flight.customers.find(cur => cur.userName === userNameCreate.value) &&
    flight.customers.find(cur => cur.userEmail === userEmailCreate.value) &&
    flight.customers.find(
      cur => cur.userPassword === Number(userPasswordCreate.value)
    )
  ) {
    alertMessage.classList.add('alert-danger');
    alertMessage.textContent = `You already have an account, Please login`;
    errorMsg();
  }
  userNameCreate.value = userEmailCreate.value = userPasswordCreate.value = '';
  // Add the user to the server
  console.log(flight);
});

btnSignIn.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    flight.customers.find(cur => cur.userEmail === userEmail.value) &&
    flight.customers.find(
      cur => cur.userPassword === Number(userPassword.value)
    )
  ) {
    formBookFlight.style.display = 'block';
  }

  userEmail.value = userPassword.value = '';
});

btnBook.addEventListener('click', function (e) {
  e.preventDefault();

  flight.book(
    userNameBook.value,
    seatNumber.value,
    currentCity.value,
    destination.value
  );

  userNameBook.value = seatNumber.value = currentCity.value = destination.value =
    '';
  console.log(flight);

  var bookingDetails = document.getElementById('bookingDetails');
  bookingDetails.html = 'DATA SUBMITTED';
});
