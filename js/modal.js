const open = document.getElementById('btnCar');
const myModal = document.getElementById('ventana-modal-car');
const closeCar = document.getElementById('closeCar');

open.addEventListener('click', () => {
    myModal.style.display = 'block';
});

closeCar.addEventListener('click', e => {
    if (e.target.id === 'ventana-modal-car' || 'closeCar') {
        myModal.style.display = 'none';
    }
});
