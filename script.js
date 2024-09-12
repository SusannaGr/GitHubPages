// Funzione per filtrare i commenti
function filterComments() {
    const keyword = document.getElementById("filterInput").value.toLowerCase(); // Ottiene la parola chiave inserita
    const comments = document.querySelectorAll('.telegram-discussion__message'); // Seleziona i commenti caricati dal widget

    comments.forEach(comment => {
        const text = comment.textContent.toLowerCase(); // Ottiene il testo del commento
        if (text.includes(keyword)) {
            comment.classList.remove('hidden'); // Mostra i commenti che contengono la parola chiave
        } else {
            comment.classList.add('hidden'); // Nasconde i commenti che non contengono la parola chiave
        }
    });
}

// Osservatore per il caricamento dinamico dei commenti nel widget
const targetNode = document.querySelector('.c'); // Seleziona il container che contiene i commenti
const config = { childList: true, subtree: true }; // Configurazione per osservare il DOM

// Callback che viene eseguita quando ci sono cambiamenti nel DOM
const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Quando i commenti sono stati caricati, applica il filtro
            filterComments();
        }
    }
};

// Crea un MutationObserver per monitorare i cambiamenti
const observer = new MutationObserver(callback);

// Avvia l'osservazione sul container dei commenti
observer.observe(targetNode, config);

// Aggiungi l'event listener al pulsante di filtro
document.getElementById("filterButton").addEventListener("click", filterComments);
