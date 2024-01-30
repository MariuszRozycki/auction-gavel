import { updateAvatar } from "../update-avatar/updateAvatar.mjs";
import { avatarIsUpdated } from "./avatarIsUpdated.mjs";

export const updateAvatarPath = () => {
  const path = location.pathname;
  if (path === "/pages/update-avatar/") updateAvatar();
  if (path === "/pages/avatar-is-updated/") avatarIsUpdated();
};
