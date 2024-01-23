export function counter() {
  let counter = 5;
  const countingDownSuccess = document.querySelector(".counter");
  countingDownSuccess.classList.remove("d-none");
  const countDown = setInterval(() => {
    countingDownSuccess.innerHTML = `<span>
  Moving to login: <br>
  ${counter} sek. left...
  </span>`;
    counter -= 1;

    if (counter < 0) {
      clearInterval(countDown);
      window.location.href = "../log-in/";
    }
  }, 1000);
}
