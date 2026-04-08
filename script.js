const toggle = document.querySelector(".toggle");
const dropdownMenu = document.querySelector(".dropdownMenu");
const dropOptions = document.querySelector(".drop-options");
const regions = document.querySelectorAll(".region");
const countriesContainer = document.querySelector(".countries");
const searchInput = document.querySelector(".search");

let allCountries = [];
let selectedRegion = "All";


toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


dropdownMenu.addEventListener("click", () => {
  dropOptions.classList.toggle("show-options");
});


async function getCountries() {

  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"
  );

  const data = await res.json();

  allCountries = data;

  displayCountries(allCountries);
}


function displayCountries(countryArray) {

  countriesContainer.innerHTML = "";

  countryArray.forEach(country => {

    const card = document.createElement("div");
    card.classList.add("country");

    card.innerHTML = `
      <div class="country-img">
        <img src="${country.flags.png}" alt="">
      </div>

      <div class="country-details">
        <h3 class="countryName">${country.name.common}</h3>

        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      </div>
    `;

    countriesContainer.appendChild(card);

  });
}


searchInput.addEventListener("input", filterCountries);


regions.forEach(region => {

  region.addEventListener("click", () => {

    selectedRegion = region.innerText;

    filterCountries();

  });

});


function filterCountries() {

  const searchText = searchInput.value.toLowerCase();

  const filtered = allCountries.filter(country => {

    const matchSearch =
      country.name.common.toLowerCase().includes(searchText);

    const matchRegion =
      selectedRegion === "All" || country.region === selectedRegion;

    return matchSearch && matchRegion;

  });

  displayCountries(filtered);

}


getCountries();