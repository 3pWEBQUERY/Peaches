const backgrounds = Array.from({ length: 11 }, (_, i) => `/login-register-bg-${i + 1}.jpg`);

export function getRandomBackground() {
  // Get a random index between 0 and backgrounds.length - 1
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
}
