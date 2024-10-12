export const sumArray = (array) => {
  return array.reduce((a, b) => a + b, 0);
};

export const decodeUrlParameter = (encoded) => {
  const decoded = atob(encoded);
  return decoded;
};

export const decrypt = (encrypted, password) => {
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i++) {
    decrypted += String.fromCharCode(
      encrypted.charCodeAt(i) ^ password.charCodeAt(i % password.length)
    );
  }
  return decrypted;
};
