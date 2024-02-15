import { updateAvatar } from "./updateAvatar.mjs";
import { avatarIsUpdated } from "./avatarIsUpdated.mjs";
import { renderAvatarLoggedUser } from "./renderAvatarLoggedUser.mjs";

/**
 * Executes specific avatar-related functions based on the current page path.
 *
 * @example
 * // To be called on page load to ensure the correct avatar functionality is initialized
 * avatarPathFunctions();
 */

export const avatarPathFunctions = () => {
  renderAvatarLoggedUser();
  const path = location.pathname;
  if (path === "/pages/update-avatar/") updateAvatar();
  if (path === "/pages/avatar-is-updated/") avatarIsUpdated();
};
