import { createElement } from "./createElement.mjs";
import { abbreviateAndCapitalize } from "./abbrevAndCapitalize.mjs";

/**
 * Creates and inserts a carousel into a specified container for displaying images.
 * This function takes an ID, an array of media URLs, and a title to generate a carousel.
 * If no media URLs are provided or the array is empty, a default "no image" picture is displayed.
 * The title of the carousel is abbreviated and capitalized for display as the alt text for each image.
 * Navigation buttons are added to the carousel only if there is more than one image.
 *
 * @param {string} id Unique identifier for the carousel, ensuring the carousel controls work correctly.
 * @param {Array<string>} media Array of URLs for the images to be displayed in the carousel.
 * @param {string} title The title of the item being displayed, used for image alt text.
 *
 * @example
 * // Example usage to create a carousel with images
 * const mediaUrls = ["http://example.com/image1.jpg", "http://example.com/image2.jpg"];
 * renderCarousel("1", mediaUrls, "Example Title");
 */

export const renderCarousel = (id, media, title) => {
  const carouselWrapper = document.querySelector("#carousel-wrapper");
  const mediaNotExists = ["../../../images/pictures/no-img.png"];
  const abbrevTitle = abbreviateAndCapitalize(title);

  /* carousel */
  const carouselId = `carouselExampleIndicators${id}`;
  const carousel = createElement("div", "carousel slide", null, { id: carouselId });
  const carouselIndicators = createElement("div", "carousel-indicators");
  const carouselInner = createElement("div", "carousel-inner");
  const mediaValue = media && media.length > 0 ? media : mediaNotExists;
  mediaValue.forEach((imgSrc, index) => {
    const button = createElement("button", `${index === 0 ? "active" : ""}`, null, {
      type: "button",
      "data-bs-target": `#${carouselId}`,
      "data-bs-slide-to": `${index}`,
      "aria-label": `Slide ${index + 1}`,
    });
    if (index === 0) button.setAttribute("aria-current", "true");
    carouselIndicators.appendChild(button);

    const carouselItem = createElement("div", index === 0 ? "carousel-item active" : "carousel-item");
    const img = createElement("img", "d-block w-100 text-light", null, { src: imgSrc, alt: abbrevTitle });
    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);
  });

  carouselWrapper.appendChild(carousel);
  carousel.appendChild(carouselIndicators);
  carousel.appendChild(carouselInner);

  if (mediaValue.length <= 1) carouselIndicators.classList.add("d-none");

  const prevButton = createElement("button", "carousel-control-prev", null, {
    type: "button",
    "data-bs-target": `#${carouselId}`,
    "data-bs-slide": "prev",
  });
  prevButton.innerHTML =
    '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

  const nextButton = createElement("button", "carousel-control-next", null, {
    type: "button",
    "data-bs-target": `#${carouselId}`,
    "data-bs-slide": "next",
  });
  nextButton.innerHTML =
    '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  if (mediaValue.length <= 1) {
    prevButton.classList.add("d-none");
    nextButton.classList.add("d-none");
  }
};
