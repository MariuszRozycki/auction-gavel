/**
 * Displays an error message to the user within a predefined container on the webpage.
 * This function is designed to provide feedback to the user when an error occurs,
 * showing a customizable message or a default message if none is provided.
 * The error message is displayed in a paragraph element, which is styled and added to an error container.
 * The error container's visibility is managed by adding or removing the 'd-none' class.
 *
 * @param {string} [message=`Something is wrong! Contact with our support!`] Optional. The error message to display. A default message is used if none is provided.
 *
 * @example
 * // To display a custom error message
 * displayError('Unable to load data. Please try again later.');
 *
 * // To display the default error message
 * displayError();
 */

export const displayError = (
  message = `Something is wrong! Try to refresh website. If it doesn't help - contact with our support!`,
) => {
  const errorContainerWrapper = document.querySelector(".error-wrap");
  errorContainerWrapper.classList.remove("d-none");
  errorContainerWrapper.innerHTML = ``;
  const errorText = document.createElement("p");
  errorText.innerText = message;
  errorText.classList.add("error", "px-2", "mx-2", "text-center");
  errorContainerWrapper.appendChild(errorText);
};
