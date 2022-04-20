const startDate = new Date('4/18/2022');

const endDate = new Date('7/26/2022');

const todaysDate = new Date();

const diffTime = Math.abs(todaysDate - endDate);

const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


document.querySelector("#daysRemaining").innerHTML = daysLeft;