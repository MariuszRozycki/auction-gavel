/**
 * Creates an object representing a new bid with the specified amount of credits.
 * This function is useful for preparing bid data in the required format before sending it to an API or processing it further.
 *
 * @param {number} credits The amount of credits being bid.
 * @returns {Object} An object containing the bid amount.
 *
 * @example
 * // Example of creating a new bid data object with an amount of 100 credits
 * const bidAmount = 100;
 * const bidData = newBidData(bidAmount);
 * console.log(bidData); // Outputs: { amount: 100 }
 */

export function newBidData(credits) {
  const newBidData = {
    amount: credits,
  };

  return newBidData;
}
