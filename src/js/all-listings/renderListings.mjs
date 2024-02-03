import { createElement } from "../utils/createElement.mjs";
import { abbreviateAndCapitalize } from "../utils/abbrevAndCapitalize.mjs";

export const renderListings = async (data) => {
  const listingsContainer = document.querySelector("#listings-container");

  // let sum = offsetNr;
  // if (path === "/" || path === "/pages/user-details/") {
  try {
    for (let listing of data) {
      const { created, description, endsAt, id, media, tags, title, updated, _count } = listing;
      const endsDate = new Date(endsAt);
      console.log(endsDate.toLocaleString());
      const abbrevTitle = abbreviateAndCapitalize(title);
      const abbrevDescription = abbreviateAndCapitalize(description);
      let tagsList = tags.join(", ");
      if (tagsList === "" || null) {
        tagsList = "Tags not exists";
      }
      const card = createElement("div", "card col-sm-6 col-lg-4 col-xl-3 px-0");
      const offerTitle = createElement("h2", "h5 text-center py-1 offer-title", abbrevTitle);
      const imgWrapper = createElement("div", "img-wrapper");
      const img = createElement("img", "card-img-top", null, { src: `${media}`, alt: `${abbrevTitle}` });
      const cardBody = createElement("div", "card-body");
      const cardText = createElement("p", "card-text", "Description: " + abbrevDescription);
      const listingEnds = createElement("p", "listing-ends", "Listing ends: " + endsDate.toLocaleString());

      // const listingTag = createElement("p", "listing-tag", `${tagsList}`);

      listingsContainer.appendChild(card);
      card.appendChild(offerTitle);
      card.appendChild(imgWrapper);
      imgWrapper.appendChild(img);
      card.appendChild(cardBody);
      cardBody.appendChild(cardText);
      cardBody.appendChild(listingEnds);
      // cardBody.appendChild(listingTag);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  // }
};
