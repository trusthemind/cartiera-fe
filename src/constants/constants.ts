export enum AppRoutes {
  Home = "/",
  Profile = "/profile",
  Login = "/auth/login",
  Register = "auth/registration",
  Cars = "/cars",
  Details = "/details",
}

export enum Theme {
  Light = "light",
  Dark="dark"
}

export const NavigationList = [
  { name: "Home", ref: AppRoutes.Home },
  { name: "Cars", ref: AppRoutes.Cars },
  { name: "Details", ref: AppRoutes.Details },
];
