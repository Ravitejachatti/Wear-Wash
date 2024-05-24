const bcrypt = require("bcrypt");
const saltRounds = 10;

// Function to hash a password
async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(`Hashed password: ${hashedPassword}`);
  return hashedPassword;
}

// Function to compare a password with a hash
async function comparePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  console.log(`Password match: ${match}`);
  return match;
}

// Example usage
(async () => {
  const password = "my_secure_password";
  const hashedPassword = await hashPassword(password);
  await comparePassword(password, hashedPassword);
})();
