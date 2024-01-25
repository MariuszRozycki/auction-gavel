import { createElement } from "../utils/createElement.mjs";
import { abbreviateAndCapitalize } from "../utils/abbrevAndCapitalize.mjs";

export const renderListings = async (data, path, offsetNr) => {
  const listingsContainer = document.querySelector("#listings-container");

  let sum = offsetNr;
  if (path === "/") {
    try {
      for (let listing of data) {
        const { created, description, endsAt, id, media, tags, title, updated, _count } = listing;
        const abbrevTitle = abbreviateAndCapitalize(title);
        const abbrevDescription = abbreviateAndCapitalize(description);
        let tagsList = tags.join(", ");
        if (tagsList === "" || null) {
          tagsList = "Tags not exists";
        }
        const card = createElement("div", "card col-sm-6 col-lg-4 col-xl-3 px-0");
        const offerNr = createElement("h2", "h5 text-center py-1 offer-nr", `Offer nr ${sum++}`);
        const imgWrapper = createElement("div", "img-wrapper");
        const img = createElement("img", "card-img-top", null, { src: `${media}`, alt: `${abbrevTitle}` });
        const cardBody = createElement("div", "card-body");
        const cardTitle = createElement("h3", "h4 card-title", `${abbrevTitle}`);
        const cardText = createElement("p", "card-text", `${abbrevDescription}`);
        // const listingTag = createElement("p", "listing-tag", `${tagsList}`);

        listingsContainer.appendChild(card);
        card.appendChild(offerNr);
        card.appendChild(imgWrapper);
        imgWrapper.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        // cardBody.appendChild(listingTag);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
