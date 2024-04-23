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

//Avatar

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
});
