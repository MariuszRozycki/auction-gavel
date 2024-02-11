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
