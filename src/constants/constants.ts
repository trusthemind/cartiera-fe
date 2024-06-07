export enum AppRoutes {
  Home = "/",
  Profile = "/profile",
  Login = "/auth/login",
  Register = "/auth/registration",
  Cars = "/cars",
  CreateCar = "/cars/create",
  CreateEngine = "/engine/create",
  Details = "/details",
  CreateDetail = "/details/create",
}

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export const NavigationList = [
  { name: "Home", ref: AppRoutes.Home },
  { name: "Cars", ref: AppRoutes.CreateCar },
  { name: "Engines", ref: AppRoutes.CreateEngine },
  { name: "Details", ref: AppRoutes.Details },
  { name: "Profile", ref: AppRoutes.Profile },
];

export const EngineFuel = {
  Petrol: "Petrol",
  Diesel: "Diesel",
  Propane: "Propane",
  Electric: "Electric",
  Hybrid: "Hybrid",
};
