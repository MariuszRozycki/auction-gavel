export function abbreviateAndCapitalize(text, maxWordLength = 20) {
  const notExists = "Element not exists";

  const path = location.pathname;

  if (!text) return notExists;
  let abbreviated;
  if (path === "./") {
    abbreviated = text;
  } else {
    abbreviated = text
      .split(" ")
      .slice(0, 5)
      .map((word) => (word.length > maxWordLength ? word.substring(0, maxWordLength) : word))
      .join(" ");
  }

  return abbreviated.charAt(0).toUpperCase() + abbreviated.slice(1);
}
