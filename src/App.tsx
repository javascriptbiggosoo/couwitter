import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Index";
import RootLayout from "./pages/RootLayout/Index";
import Profile from "./pages/Profile";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
