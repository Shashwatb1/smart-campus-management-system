// Single source of truth for "where does this role land after login"
export const dashboardPathForRole = (role) => {
  if (role === "admin") return "/admin";
  if (role === "faculty") return "/faculty";
  return "/student";
};
