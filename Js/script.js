// wanneer ze 20px zakt komt e button tevoorschijn
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

//klik om naar boven te gaan
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Faq
function toggleAnswer(question) {
    var answer = question.querySelector('.answer');
    if (answer.style.display === "none") {
        answer.style.display = "block";
    } else {
        answer.style.display = "none";
    }
}


//Avatar
var selectedCharacter;

function openModal(name, series, description) {
    selectedCharacter = { name: name, series: series, description: description };
    document.getElementById('modal-title').innerText = name + ' - ' + series;
    document.getElementById('modal-image').src = 'https://via.placeholder.com/150';
    document.getElementById('modal-description').innerText = description;
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

window.onclick = function (event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function setActiveAvatar() {

    console.log('Setting', selectedCharacter.name, 'as active avatar...');
}

function addToFavorites() {

    console.log('Adding', selectedCharacter.name, 'to favorites...');
}

function addToBlacklist() {

    console.log('Adding', selectedCharacter.name, 'to blacklist...');
}




//POP UP
document.addEventListener('DOMContentLoaded', function () {
    const gameBlocks = document.querySelectorAll('.game');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');


    gameBlocks.forEach((block) => {

        block.addEventListener('click', () => {
            if (block.id !== 'fortnite') {
                popup.style.display = 'block';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});


let fortnite = document.getElementById('fortnite');

fortnite.addEventListener('click', function () {
    // Plaats hier je JavaScript-code
    var modal = document.getElementById("myModal");
    var img = document.getElementById("fortimg");

    img.onclick = function () {
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    // Sluit het modale venster wanneer er buiten geklikt wordt
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }
});