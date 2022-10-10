import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { createSingleMarkup, createManyMarkup } from './createMarkup';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

let countryName = '';

function handleInput(evt) {
  clearMarkup();

  countryName = evt.target.value.trim().toLowerCase();

  if (!countryName || countryName === ' ') {
    return;
  } else
    fetchCountries(countryName)
      .then(data => {
        if (data.length === 1) {
          renderSingleCountry(data);
        } else if (data.length >= 2 && data.length <= 10) {
          renderManyCountries(data);
        } else {
          onTooManyResults();
          console.log(data);
        }
      })
      .catch(error => {
        onIncorrectInput();
      });
}

function renderManyCountries(data) {
  const markup = data.map(createManyMarkup).join('');
  refs.list.innerHTML = markup;
}

function renderSingleCountry(data) {
  const markup = data.map(createSingleMarkup).join('');
  refs.info.innerHTML = markup;
}

function onTooManyResults() {
  return Notify.warning(
    'Too many matches found. Please enter a more specific name.'
  );
}

function onIncorrectInput() {
  return Notify.failure('Oops, there is no country with that name');
}

function clearMarkup() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
