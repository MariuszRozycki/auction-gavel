import { updateAvatar } from "./updateAvatar.mjs";
import { avatarIsUpdated } from "./avatarIsUpdated.mjs";
import { renderAvatarLoggedUser } from "./renderAvatarLoggedUser.mjs";

export const avatarPathFunctions = () => {
  renderAvatarLoggedUser();
  const path = location.pathname;
  if (path === "/pages/update-avatar/") updateAvatar();
  if (path === "/pages/avatar-is-updated/") avatarIsUpdated();
};
