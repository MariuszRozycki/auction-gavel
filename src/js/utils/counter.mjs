/**
 * Initiates a countdown from 5 seconds, updating the displayed text each second.
 * This function is designed to provide a visual countdown for the user, indicating
 * that they will be redirected to the login page after the countdown finishes.
 * The countdown is displayed in an element with the class `.counter`, which is made visible at the start.
 * Once the countdown reaches zero, the function redirects the user to the login page.
 *
 * @example
 * // To be called when you want to start the countdown and redirect after completion
 * counter();
 */

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
