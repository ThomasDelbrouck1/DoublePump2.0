// wanneer ze 20px zakt komt e button tevoorschijn
window.onscroll = function () {
  scrollFunction();
};

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

//POP UP
document.addEventListener("DOMContentLoaded", function () {
  const gameBlocks = document.querySelectorAll(".game");
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close-btn");

  gameBlocks.forEach((block) => {
    block.addEventListener("click", () => {
      if (block.id !== "fortnite") {
        popup.style.display = "block";
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
  function openModal(imageSrc) {
    var modalImg = document.getElementById('modalImage');
    modalImg.src = imageSrc;
    var myModal = new bootstrap.Modal(document.getElementById('imageModal'));
    myModal.show();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const animations = ['moveDiagonal', 'moveHorizontal', 'moveVertical'];
  const elements = document.querySelectorAll('.floatingElement');

  elements.forEach(el => {
    const animationName = animations[Math.floor(Math.random() * animations.length)];
    const duration = Math.random() * 10 + 15;
    el.style.animationName = animationName;
    el.style.animationDuration = `${duration}s`;
  });
});
document.querySelector('.hamburger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.navbar-nav').classList.toggle('active');
});
/*
let characterStats = {};

function increaseWins(characterId) {
  if (!characterStats[characterId]) {
    characterStats[characterId] = { wins: 0, losses: 0 };
  }
  characterStats[characterId].wins++;
  document.querySelector(`#myModal #wins-count[data-id="${characterId}"]`).innerText = characterStats[characterId].wins;
}

function decreaseWins(characterId) {
  if (characterStats[characterId] && characterStats[characterId].wins > 0) {
    characterStats[characterId].wins--;
    document.querySelector(`#myModal #wins-count[data-id="${characterId}"]`).innerText = characterStats[characterId].wins;
  }
}

function increaseLosses(characterId) {
  if (!characterStats[characterId]) {
    characterStats[characterId] = { wins: 0, losses: 0 };
  }
  characterStats[characterId].losses++;
  document.querySelector(`#myModal #losses-count[data-id="${characterId}"]`).innerText = characterStats[characterId].losses;
}

function decreaseLosses(characterId) {
  if (characterStats[characterId] && characterStats[characterId].losses > 0) {
    characterStats[characterId].losses--;
    document.querySelector(`#myModal #losses-count[data-id="${characterId}"]`).innerText = characterStats[characterId].losses;
  }
}

async function saveStats(characterId) {
  const wins = characterStats[characterId] ? characterStats[characterId].wins : 0;
  const losses = characterStats[characterId] ? characterStats[characterId].losses : 0;
  const notes = document.getElementById('notes').value;

  const data = {
    characterId,
    wins,
    losses,
    notes,
  };

  try {
    const response = await fetch('/api/save-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Gegevens succesvol opgeslagen');
    } else {
      alert('Er is een fout opgetreden bij het opslaan van de gegevens');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Er is een fout opgetreden bij het opslaan van de gegevens');
  }
}
*/
