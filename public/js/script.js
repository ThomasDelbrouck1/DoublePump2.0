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
