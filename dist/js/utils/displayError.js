export const displayError = (message = `Something is wrong! Contact with our support!`) => {
  // const errorMessage = `${error ? ": " + error.toString() : ""} ${message}`;
  // const existingError = document.querySelector(".display-error");
  // if (existingError) {
  //   existingError.remove();
  // }

  const errorContainerWrapper = document.querySelector(".error-wrap");
  errorContainerWrapper.innerHTML = ``;
  const errorText = document.createElement("p");
  errorText.innerText = message;
  errorText.classList.add("error", "px-2", "mx-2", "text-center");
  errorContainerWrapper.appendChild(errorText);
};
