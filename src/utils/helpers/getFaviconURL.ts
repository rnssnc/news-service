export const getFaviconURL = (url: string) => {
  const domain = (new URL(url)).hostname;
  
  return `https://s2.googleusercontent.com/s2/favicons?domain=${domain}`;
};
