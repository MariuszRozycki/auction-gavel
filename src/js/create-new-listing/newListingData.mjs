/**
 * Constructs a new listing data object from provided input values.
 * Processes the tags and media strings into arrays by splitting them on commas and trimming whitespace.
 * This function is useful for preparing the data structure required for creating a new listing,
 * especially before sending it to an API or storing it in a database.
 *
 * @param {string} title The title of the listing.
 * @param {string} description The description of the listing.
 * @param {string} endsAt The end date and time for the listing.
 * @param {string} tags A comma-separated string of tags related to the listing.
 * @param {string} media A comma-separated string of media URLs for the listing.
 * @returns {Object} An object containing the structured data of the new listing.
 *
 * @example
 * // Example of creating a new listing data object
 * const title = "Vintage Lamp";
 * const description = "A beautiful vintage lamp in excellent condition.";
 * const endsAt = "2023-12-31T23:59:59";
 * const tags = "vintage, lamp, home decor";
 * const media = "http://example.com/lamp1.jpg, http://example.com/lamp2.jpg";
 * const listingData = newListingData(title, description, endsAt, tags, media);
 * console.log(listingData);
 * // Outputs:
 * // {
 * //   title: "Vintage Lamp",
 * //   description: "A beautiful vintage lamp in excellent condition.",
 * //   endsAt: "2023-12-31T23:59:59",
 * //   tags: ["vintage", "lamp", "home decor"],
 * //   media: ["http://example.com/lamp1.jpg", "http://example.com/lamp2.jpg"]
 * // }
 */

export function newListingData(title, description, endsAt, tags, media) {
  const tagsArray = tags.split(",").map((tag) => tag.trim());
  const mediaArray = media.split(",").map((media) => media.trim());

  const newListingData = {
    title: title,
    description: description,
    endsAt: endsAt,
    tags: tagsArray,
    media: mediaArray,
  };

  return newListingData;
}
