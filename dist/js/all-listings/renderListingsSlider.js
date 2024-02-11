import { createElement } from "../utils/createElement.mjs";
import { abbreviateAndCapitalize } from "../utils/abbrevAndCapitalize.mjs";
import { singleListingById } from "../single-listing/singleListingById.mjs";
export const renderListings = async (data) => {
  const listingsContainer = document.querySelector("#listings-container");
  const mediaNotExists = ["../../../images/pictures/no-img.png"];
  try {
    for (let listing of data) {
      const { id, media, title, description, tags, created, endsAt } = listing;
      const createdDate = new Date(created);
      const endsDate = new Date(endsAt);
      const abbrevTitle = abbreviateAndCapitalize(title);
      const abbrevDescription = abbreviateAndCapitalize(description);
      let tagsList = tags.join(", ");
      if (!tagsList) {
        tagsList = "Tags not exists";
      }
      const card = createElement("div", "card col-sm-6 col-lg-4 col-xl-3 px-0", null, {
        "data-id": id,
      });
      const offerTitle = createElement("h2", "h5 text-center py-1 offer-title", abbrevTitle);
      const carouselId = `carouselExampleIndicators${id}`;
      const carousel = createElement("div", "carousel slide", null, {
        id: carouselId,
      });
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
        const img = createElement("img", "d-block w-100", null, {
          src: imgSrc,
          alt: abbrevTitle,
        });
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
      });
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
      const cardBody = createElement("div", "card-body");
      const cardText = createElement("p", "card-text", "Description: " + abbrevDescription);
      const listingCreated = createElement(
        "p",
        "card-text listing-created",
        "Created: " + createdDate.toLocaleString(),
      );
      const listingEnds = createElement("p", "card-text listing-ends", "Listing ends: " + endsDate.toLocaleString());
      listingsContainer.appendChild(card);
      card.appendChild(offerTitle);
      card.appendChild(carousel);
      card.appendChild(cardBody);
      cardBody.appendChild(cardText);
      cardBody.appendChild(listingCreated);
      cardBody.appendChild(listingEnds);
    }
    const allCards = document.querySelectorAll(".card");
    singleListingById(allCards);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
