export const auth = ({ next, router }: any) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return next({ name: "login" });
  }

  return next();
};
