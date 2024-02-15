export const displayError = (message = `Something is wrong! Contact with our support!`) => {
  const errorContainerWrapper = document.querySelector(".error-wrap");
  errorContainerWrapper.classList.remove("d-none");
  errorContainerWrapper.innerHTML = ``;
  const errorText = document.createElement("p");
  errorText.innerText = message;
  errorText.classList.add("error", "px-2", "mx-2", "text-center");
  errorContainerWrapper.appendChild(errorText);
};
