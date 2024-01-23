import { createElement } from "../utils/createElement.mjs";

export const navNotLogged = () => {
  console.log("nie zalogowany");
  const navItems = [
    { text: "Home", href: "./index.html" },
    { text: "About Us", href: "./about.html" },
    { text: "Contact", href: "./../../../pages/contact/" },
    { text: "Log in", href: "./pages/log-in/" },
  ];

  const navContainer = document.getElementById("nav-container");

  navItems.forEach((item) => {
    // Sprawdź, czy aktualny adres URL pasuje do href elementu nawigacji
    const isCurrentPage =
      location.pathname.endsWith(item.href) || (location.pathname === "/" && item.href === "./index.html");
    console.log("isCurrentPage", isCurrentPage);

    const listItem = createElement("li", "nav-item");
    const link = createElement("a", "nav-link", item.text, {
      href: item.href,
      // Ustaw 'aria-current' na 'page' tylko jeśli to aktualna strona
      "aria-current": isCurrentPage ? "page" : undefined,
    });

    listItem.appendChild(link);
    navContainer.appendChild(listItem);

    // Dodajemy również podział między elementami nawigacji
    if (item.text !== "Log in") {
      const divider = createElement("hr", "divider");
      navContainer.appendChild(divider);
    }
  });
};
// import { createElement } from "../utils/createElement.mjs";

// export const navNotLogged = () => {
//   const navContainer = document.querySelector("#nav-container");
//   const navItems = [
//     { text: "Home", href: "./index.html", current: true },
//     { text: "About Us", href: "./about.html" },
//     { text: "Contact", href: "./contact.html" },
//     { text: "Log in", href: "./pages/log-in/" },
//   ];

//   navItems.forEach((item) => {
//     console.log("item", item);
//     const listItem = createElement("li", "nav-item");
//     const link = createElement("a", "nav-link", item.text, {
//       href: item.href,
//       "aria-current": item.current ? "page" : undefined,
//     });

//     listItem.appendChild(link);
//     navContainer.appendChild(listItem);

//     if (item.text !== "Log in") {
//       const divider = createElement("hr", "divider");
//       navContainer.appendChild(divider);
//     }
//   });

//   console.log("User is not logged.");
// };
