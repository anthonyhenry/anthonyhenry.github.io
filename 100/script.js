const startDate = new Date('4/17/2022');

const endDate = new Date('7/26/2022');

const diffTime = Math.abs(startDate - endDate);

const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


document.querySelector("#daysRemaining").innerHTML = daysLeft;