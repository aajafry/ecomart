
export function getProfilePath(role) {
  if (["admin", "administrator", "moderator", "supervisor"].includes(role)) {
    return "/admin/user/profile";
  } else if (
    [
      "shop-admin",
      "shop-administrator",
      "shop-moderator",
      "shop-supervisor",
    ].includes(role)
  ) {
    return "/shop/user/profile";
  } else if (["customer"].includes(role)) {
    return "/user/profile";
  }
}