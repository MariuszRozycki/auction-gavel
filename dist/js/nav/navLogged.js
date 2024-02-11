import { createElement } from "../utils/createElement.mjs";
import { logOut } from "../auth/logOut.mjs";
export const navLogged = (navContainer) => {
  console.log("Pomyslnie zalogowany!");
  const path = location.pathname;
  const navItems = [
    {
      text: "Home",
      href: "/pages/user-details/",
    },
    {
      text: "My credits",
      href: "/pages/my-credits/",
    },
    {
      text: "About Us",
      href: "/pages/about/",
    },
    {
      text: "Contact",
      href: "/pages/contact/",
    },
    {
      text: "Update avatar",
      href: "/pages/update-avatar/",
    },
    {
      text: "Create listing",
      href: "/pages/create-new-listing/",
    },
    {
      text: "Log out",
      href: "#",
    },
  ];
  navContainer.innerHTML = "";
  navItems.forEach((item) => {
    const { text, href } = item;
    const listItem = createElement("li", "nav-item");
    const linkAttributes = {
      href: href,
    };
    if (text === "Log out") {
      linkAttributes.id = "log-out-btn";
    }
    const link = createElement("a", "nav-link", text, linkAttributes);
    if (path === href) {
      link.setAttribute("aria-current", "page");
    }
    listItem.appendChild(link);
    navContainer.appendChild(listItem);
    if (text === "Home") {
      const divider = createElement("hr", "divider");
      navContainer.appendChild(divider);
    }
  });
  const logOutButton = document.querySelector("#log-out-btn");
  logOut(logOutButton);
};
