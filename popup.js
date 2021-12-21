const newsletter = document.getElementById('popup-wrapper');
const close = document.getElementById('close');

close.addEventListener('click', e =>{
    if(e.target.id === 'popup-wrapper' || 'close' ) {
        newsletter.style.display = 'none';
    }
});

