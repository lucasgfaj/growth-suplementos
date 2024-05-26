document.addEventListener("DOMContentLoaded", function() {
    fetch('/app/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('/app/favicons.html')
        .then(response => response.text())
        .then(data => {
            const head = document.head || document.getElementsByTagName('head')[0];
            const placeholder = document.createElement('div');
            placeholder.innerHTML = data;
            while (placeholder.firstChild) {
                head.appendChild(placeholder.firstChild);
            }
        })
        .catch(error => console.error('Erro ao carregar os favicons:', error));
});