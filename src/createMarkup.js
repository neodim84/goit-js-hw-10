export { createSingleMarkup, createManyMarkup };

function createSingleMarkup(data) {
  const { flags, name, capital, population, languages } = data;
  const langString = Object.values(languages).join(', ');

  return `
    <div class='country-list__item'>
    <img class='country-list__flag' width='60px' height='40px' src='${flags.svg}'></img>
    <p class='country-list__name'>${name.official}</p>
    </div>
    <div class='descr'>
    <p class='descr__name'>Capital: ${capital}</p>
    <p class='descr__name'>Population: ${population}</p>
    <p class='descr__name'>Languages: ${langString}</p>
    </div>`;
}

function createManyMarkup(data) {
  const { flags, name } = data;

  return `
    <li class='country-list__item'>
    <img class='country-list__flag' width='30px' height='20px' src='${flags.svg}'></img>
    <p class='country-list__name'>${name.official}</p>
    </li>`;
}
