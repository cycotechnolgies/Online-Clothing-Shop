// Using a Set for efficient add and has operations.
// Note: This is an in-memory blacklist and will be cleared on server restart.
// For production, a persistent store like Redis would be more suitable.
const blacklistedTokens = new Set();

const add = (token) => {
  blacklistedTokens.add(token);
};

const has = (token) => {
  return blacklistedTokens.has(token);
};

module.exports = {
  add,
  has,
};
