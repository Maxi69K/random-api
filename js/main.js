// Random API
let allTabs = document.querySelectorAll('.my-nav ul li');
let section = document.querySelector('.section');
let allButtons = document.querySelectorAll('.my-nav a');
let input = document.querySelector('.container input');
let enterBtn = document.querySelector('.enter-button');
let title = document.querySelector('.title');
let errorBox = document.querySelector('.error');
let titleH1 = '';
let url = '';
let visited = [];

allButtons.forEach((button) => button.addEventListener('click', changeApi));
enterBtn.addEventListener('click', showCustomApi);

function showCustomApi() {
  let error = [];
  if (!input.value.includes('https://')) {
    error.push('Please enter a valid link with "https://"');
    console.log(error);
  }
  if (!input.value) {
    error.push('Enter the link in the input field!');
  }
  if (error.length !== 0) {
    error.forEach((er) => (errorBox.innerHTML = er));
  } else {
    url = input.value;
    getFetch();
    createTitle();
    title.innerHTML = '';
    input.value = '';
    error = [];
    errorBox.innerHTML = '';
  }
}

function changeApi(e) {
  e.preventDefault();
  url = this.getAttribute('href');
  titleH1 = this.innerText;
  allButtons.forEach((button) => button.classList.remove('active'));
  this.classList.add('active');
  if (visited.hasOwnProperty(this.innerHTML)) {
    createTable(visited[this.innerText]);
  } else {
    getFetch(this.innerHTML);
  }
  createTitle();
}

function getFetch(category) {
  document.body.classList.add('loader');
  fetch(`${url}`)
    .then((prom) => prom.json())
    .then((res) => {
      let data = res;
      createTable(data);
      visited[category] = data;
      document.body.classList.remove('loader');
    });
}

function createTitle() {
  title.innerText = titleH1;
}

function createTable(data) {
  let text = '';

  text += '<table class="table">';
  text += '<thead>';
  text += '<tr>';
  for (const th in data[0]) {
    text += `<th>${th}</th>`;
  }
  text += '</tr>';
  text += '</thead>';
  text += '<tbody>';
  data.forEach((el) => {
    text += `<tr>`;
    for (const td in el) {
      text += `<td>${el[td]}</td>`;
    }
    text += `<tr>`;
  });
  text += '</tbody>';
  text += '</table>';

  section.innerHTML = text.trim();
}
