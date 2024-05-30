document.addEventListener('DOMContentLoaded', function () {
  let texasData = []; // Store the fetched data globally
  const pageSize = 10; // Number of rows per page
  let currentPage = 1;

  fetch('texas.json')
      .then(response => response.json())
      .then(texas => {
          texasData = texas;
          renderTable(texasData);
          addPagination();
          addSearch();
      })
      .catch(error => console.error('Error fetching data:', error));

  function renderTable(data) {
      const tableBody = document.getElementById('tableBody');
      tableBody.innerHTML = ''; // Clear existing table body

      data.forEach(function (item) {
          const row = document.createElement('tr');

          Object.values(item).forEach(function (value) {
              const cell = document.createElement('td');
              cell.textContent = value;
              row.appendChild(cell);
          });

          tableBody.appendChild(row);
      });
  }

  function showPage(pageNumber) {
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      const dataToShow = texasData.slice(start, end);
      renderTable(dataToShow);
      document.getElementById('currentPage').textContent = `Page ${currentPage}`;
  }

  function updatePaginationButtons() {
      const totalPages = Math.ceil(texasData.length / pageSize);
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');

      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
  }

  function addPagination() {
      const table = document.getElementById('dataTable');

      table.insertAdjacentHTML('afterend', `
          <div id="pagination">
              <button id="prevBtn">Previous</button>
              <span id="currentPage">Page ${currentPage}</span>
              <button id="nextBtn">Next</button>
          </div>
      `);

      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');

      prevBtn.addEventListener('click', () => {
          if (currentPage > 1) {
              currentPage--;
              showPage(currentPage);
              updatePaginationButtons();
          }
      });

      nextBtn.addEventListener('click', () => {
          const totalPages = Math.ceil(texasData.length / pageSize);
          if (currentPage < totalPages) {
              currentPage++;
              showPage(currentPage);
              updatePaginationButtons();
          }
      });

      showPage(currentPage);
      updatePaginationButtons();
  }

  function addSearch() {
      const searchInput = document.createElement('input');
      searchInput.setAttribute('type', 'text');
      searchInput.setAttribute('placeholder', 'Search...');
      document.body.insertBefore(searchInput, document.getElementById('dataTable'));

      searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.trim().toLowerCase();
          if (searchTerm === '') {
              renderTable(texasData); // Display all records when search input is empty
              currentPage = 1; // Reset current page to 1
              showPage(currentPage);
              updatePaginationButtons();
              return;
          }
          const filteredData = texasData.filter(item =>
              Object.values(item).some(value => String(value).toLowerCase().includes(searchTerm))
          );
          renderTable(filteredData);
      });
  }
});
