document.querySelector('.menu-btn').addEventListener('click', () => document.querySelector('.main-menu').classList.toggle('show'));

//5. load data json
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('Superstore.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to load file');
//         }
//         return response.json();
//       })
//       .then(Superstore => {
//         console.log("test:",Superstore[1].Sales);
//   })
// })


document.addEventListener('DOMContentLoaded', function () {
  fetch('Superstore.json')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error('Error fetching data:', error));

  function renderTable(Superstore) {
    var tableBody = document.getElementById('tableBody');

    Superstore.forEach(function (item) {
      var row = document.createElement('tr');

      Object.values(item).forEach(function (value) {
        var cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  }
});
