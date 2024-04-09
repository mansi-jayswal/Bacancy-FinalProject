const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "Submit Your Recipe", path: "/new-recipe" },
    // { name: "Login/Register", path: "/login" },
    { name: "About Us", path: "/about" }
  ];
  
  const userLinks = [
    ...publicLinks,
    { name: "Saved Recipes", path: "/saved-recipes" },
    { name: "My Creations", path: "/my-creations" },
    { name: "Profile", path: "/profile" },
    // { name: "Logout", path: "/logout" }
  ];
  
  const adminLinks = [
    // ...publicLinks,
    { name: "Sub-admins", path: "/admin" },
    // { name: "Users", path: "/admin-users" },
    { name: "Users", path: "/admin-users" }
  ];
  
  const subAdminLinks = [
    // ...publicLinks,
    { name: "Cuisines", path: "/subadmin" },
    { name: "Reviews Section", path: "/subadmin-reviews" }
  ];
  
  export { publicLinks, userLinks, adminLinks, subAdminLinks };
  