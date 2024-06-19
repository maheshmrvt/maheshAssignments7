document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;
    const dataContainer = document.getElementById('dataContainer');
    const spinner = document.getElementById('loadingSpinner');

    if (url) {
        dataContainer.style.display = 'none';
        spinner.classList.remove('d-none');
        dataContainer.innerHTML = '';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                spinner.classList.add('d-none');
                displayData(data);
            })
            .catch(error => {
                spinner.classList.add('d-none');
                dataContainer.style.display = 'block';
                dataContainer.innerHTML = `<p class="text-danger">Failed to fetch data. Error: ${error}</p>`;
            });
    } else {
        alert('Please enter a valid URL');
    }
});

function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    const jsonData = JSON.stringify(data, null, 2);
    const preElement = document.createElement('pre');
    preElement.textContent = jsonData;
    dataContainer.appendChild(preElement);
    dataContainer.style.display = 'block';
}