const dropDown = document.querySelector('.dropdownMenu');
const dropOptions = document.querySelector('.drop-options');
const toggle = document.querySelector('.toggle');
const countries = document.querySelector('.countries');


toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggle.classList.toggle('dark-mode');
  dropOptions.style.backgroundColor = "black";
  dropOptions.style.color = "white";
});


dropDown.addEventListener('click', () => {
  dropOptions.classList.toggle('show-options');
});


async function getCountry() {

  const URL = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region');
  const res = await URL.json();

  res.forEach(country => {
    showCountry(country);
  });

}


function showCountry(data) {

  const country = document.createElement('div');
  country.classList.add('country');

  country.innerHTML = `
      <div class="country-img">
        <img src="${data.flags.png}" alt="">
      </div>

      <div class="country-details">
        <h4 class = "countryName">${data.name.common}</h4>
        <div class="country-details-inside">
          <p><strong>Population:</strong> ${data.population}</p>
          <p><strong>Region:</strong> ${data.region}</p>
          <p><strong>Capital:</strong> ${data.capital ? data.capital[0] : "N/A"}</p>
        </div>
      </div>
  `;

  countries.appendChild(country);

}


const search = document.querySelector('.Search');

search.addEventListener("input", e => {

  const countryName = document.getElementsByClassName('countryName');

  Array.from(countryName).forEach(country => {

    if(country.innerText.toLowerCase().includes(search.value.toLowerCase())){
      country.parentElement.parentElement.style.display = "block";
    }
    else{
      country.parentElement.parentElement.style.display = "none";
    }

  });

});




getCountry();