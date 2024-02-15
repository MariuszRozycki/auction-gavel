/**
 * Creates an object containing media profile data.
 *
 * @param {string} avatar The URL of the user's avatar.
 * @returns {Object} An object containing the avatar URL.
 *
 * @example
 * // Example of creating media profile data with an avatar URL
 * const avatarUrl = "https://i.pravatar.cc/150?u=fake@pravatar.com";
 * const profileMedia = mediaProfileData(avatarUrl);
 * console.log(profileMedia); // Outputs: { avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com" }
 */

export const mediaProfileData = (avatar) => {
  const mediaData = {
    avatar,
  };

  return mediaData;
};
