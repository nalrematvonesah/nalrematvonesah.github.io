const likeSound = new Audio("../../assets/sounds/like.mp3");
const commentSound = new Audio("../../assets/sounds/follow.mp3");
const shareSound = new Audio("../../assets/sounds/share.mp3");
const socialActions = {
  likes: 0,
  comments: 0,

  likePost() {
    this.likes++;
    likeSound.currentTime = 0;
    likeSound.play();
    const likeCounter = document.querySelector("#likeCount");
    if (likeCounter) likeCounter.textContent = this.likes;
  },

  commentPost() {
    this.comments++;
    commentSound.currentTime = 0;
    commentSound.play();
    const commentCounter = document.querySelector("#commentCount");
    if (commentCounter) commentCounter.textContent = this.comments;
  }
};

function addButtonEffects(button) {
  if (!button) return;

  button.style.transition = "background-color 0.3s, box-shadow 0.3s, transform 0.3s";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
    button.style.boxShadow = "0 0 8px rgba(255, 255, 255, 0.6)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "";
    button.style.boxShadow = "";
  });

  button.addEventListener("click", () => {
    button.style.transform = "scale(1.2)";
    button.style.boxShadow = "0 0 12px 4px rgba(255, 255, 255, 0.8)";

    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "0 0 8px rgba(255, 255, 255, 0.6)";
    }, 150);

    setTimeout(() => {
      if (!button.matches(':hover')) {
        button.style.boxShadow = "";
        button.style.backgroundColor = "";
      }
    }, 300);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.getElementById("likeBtn");
  const commentBtn = document.getElementById("commentBtn");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const followBtn = document.getElementById("followBtn");
  const shareBtn = document.getElementById("shareBtn");


  addButtonEffects(likeBtn);
  addButtonEffects(followBtn);
  addButtonEffects(shareBtn);

  if (likeBtn) {
    likeBtn.addEventListener("click", () => {
      socialActions.likePost();
    });
  }

  if (commentBtn) {
    commentBtn.addEventListener("click", () => {
      socialActions.commentPost();

      commentBtn.style.transform = "scale(1.2)";
      setTimeout(() => (commentBtn.style.transform = "scale(1)"), 150);
    });
  }

  
  addButtonEffects(followBtn);
  addButtonEffects(shareBtn);
});

const likeBtn = document.getElementById('likeBtn');
const followBtn = document.getElementById('followBtn');
const shareBtn = document.getElementById('shareBtn');

function playSound(fileName) {
  const sound = new Audio(`../../assets/sounds/${fileName}`);
  sound.play();
}

likeBtn.addEventListener('click', () => playSound('like.mp3'));
followBtn.addEventListener('click', () => playSound('follow.mp3'));
shareBtn.addEventListener('click', () => playSound('share.mp3'));
