export enum AppRoutes {
  Home = "/",
  Profile = "/profile",
  Login = "/auth/login",
  Register = "/auth/registration",
  Cars = "/cars",
  CreateCar = "/cars/create",
  Details = "/details",
  CreateDetail = "/details/create",
}

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export const NavigationList = [
  { name: "Home", ref: AppRoutes.Home },
  { name: "Cars", ref: AppRoutes.Cars },
  { name: "Details", ref: AppRoutes.Details },
];
