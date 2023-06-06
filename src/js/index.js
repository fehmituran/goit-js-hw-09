import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import {myPromise} from './promise.js';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const select = document.querySelector('.select-breed');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const loader2 = document.querySelector('.loader2');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.display = 'none';
    select.style.display = 'flex';
  }, 2000);
});


const getBreeds = () => {
  fetchBreeds()
    .then(breeds => {
      const markup = breeds
        .map(({ id, name }) => {
          return `<option value="${id}">${name}</option>`;
        })
        .join('');
      breedSelect.innerHTML = markup;

      new SlimSelect({
        select: '.breed-select',
      });
      
    })
    .catch(error =>  {
      return (catInfo.innerHTML = `<p class="error">Oops! Something went wrong! Try reloading the page!</p>`);
    });
};

getBreeds();

breedSelect.addEventListener('change', selectedData);

function selectedData() {
  myPromise(0, getLoader2)
    .then(() => myPromise(1, removeLoader2))
    .then(() => myPromise(0, getSelectedData));
};

function getSelectedData() {
  let breedId = breedSelect.value;

  fetchCatByBreed(breedId).then(breed => {
    fetchCatByBreed(breedId)
      .then(item => {
        return (catInfo.innerHTML = `
          <div id="container">
          <div class="breed-details">
            <h1>${item[0].breeds[0].name}</h1>
            <p class="information">${item[0].breeds[0].description}</p>
            <h3>Temperament: </h3>
            <p class="information">${item[0].breeds[0].temperament}</p>
          </div>
  
          <div class="breed-image">
            <img
              src="${item[0].url}"
              alt=""
            />
            <div class="info">
              <h2>information</h2>
              <ul>
                 <li>Origin: ${item[0].breeds[0].origin}</li>
                <li>child_friendly: ${item[0].breeds[0].child_friendly}</li>
                <li>dog_friendly: ${item[0].breeds[0].dog_friendly}</li>
                <li>stranger_friendly: ${item[0].breeds[0].stranger_friendly}</li>
              </ul>
            </div>
          </div>
        </div>`);
      })
      .catch(error => {
        return (catInfo.innerHTML = `<p class="error">Oops! Something went wrong! Try reloading the page!</p>`);
      });
  });
}

function removeLoader2() {
  loader2.style.display = 'none';
}

function getLoader2() {
  catInfo.innerHTML = '';
  loader2.style.display = 'block';
}






