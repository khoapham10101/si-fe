export const handleImagePath = (path: string): string => {
  return `${process.env.VUE_APP_API_URL}/storage/${path}`;
};
