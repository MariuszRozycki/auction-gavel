import { createElement } from "../utils/createElement.mjs";
import { abbreviateAndCapitalize } from "../utils/abbrevAndCapitalize.mjs";
import { singleListingById } from "../single-listing/singleListingById.mjs";

export const renderListings = async (data) => {
  const listingsContainer = document.querySelector("#listings-container");
  const mediaNotExists = ["../../../images/pictures/no-img.png"];

  try {
    for (let listing of data) {
      const { created, description, endsAt, id, media, tags, title, updated, _count } = listing;
      const createdDate = new Date(created);
      const endsDate = new Date(endsAt);
      const abbrevTitle = abbreviateAndCapitalize(title);
      const abbrevDescription = abbreviateAndCapitalize(description);
      const mediaValue = media && media.length > 0 ? media : mediaNotExists;

      let tagsList = tags.join(", ");
      if (tagsList === "" || null) {
        tagsList = "Tags not exists";
      }

      const card = createElement("div", "card col-sm-6 col-lg-4 col-xl-3 px-0", null, { "data-id": id });
      const offerTitle = createElement("h2", "h5 text-center py-1 offer-title", "Title: " + abbrevTitle);
      const imgWrapper = createElement("div", "img-wrapper");
      const img = createElement("img", "card-img-top", null, { src: `${mediaValue[0]}`, alt: `${abbrevTitle}` });
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
      card.appendChild(imgWrapper);
      imgWrapper.appendChild(img);
      card.appendChild(cardBody);
      cardBody.appendChild(cardText);
      cardBody.appendChild(listingCreated);
      cardBody.appendChild(listingEnds);
    }

    const allCards = document.querySelectorAll(".card");
    singleListingById(allCards);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
