document.addEventListener('DOMContentLoaded', function() {
    const saveProfileBtn = document.getElementById('saveProfile');
    const updateBalanceBtn = document.getElementById('updateBalance');

    saveProfileBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const income = document.getElementById('income').value;

        // Simulazione di salvataggio del profilo
        alert(`Profilo salvato:\nNome: ${name}\nEmail: ${email}\nEtà: ${age}\nReddito Mensile: ${income}€`);
    });

    updateBalanceBtn.addEventListener('click', function() {
        const expenses = document.getElementById('expenses').value;
        const savingsSpan = document.getElementById('savings');

        // Calcolo dei risparmi
        const income = document.getElementById('income').value;
        const savings = income - expenses;

        // Aggiornamento dei risparmi visualizzati
        savingsSpan.textContent = savings >100000000 ? 'Errore' : savings;
    });
});
