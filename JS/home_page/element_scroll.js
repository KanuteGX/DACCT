//section estrategias

const bgrCardTwo = document.getElementById('bgrCardTwo');
const containerCardTwo = document.getElementById('containerCardTwo');
const cardTwo = document.getElementById('cardTwo');

const elementOpacityScroll = () => {
  let scrollTop = document.firstElementChild.scrollTop;
  let cardTop = containerCardTwo.offsetTop;
  let viewportHeight = document.firstElementChild.clientHeight;
  console.log(1);
  if (scrollTop > cardTop - viewportHeight / 1.3) {
    bgrCardTwo.classList.add('background-card2__scroll');
    cardTwo.classList.add('card2__scroll');
  }
};

addEventListener('scroll', () => {
<<<<<<< HEAD
  elementOpacityScroll(); 
=======
  elementOpacityScroll();
>>>>>>> 0e4df4f007fdfda0b2b05f124e1a2b09c2a871f8
});
