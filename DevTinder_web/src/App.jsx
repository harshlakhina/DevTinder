import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/RootLayout"
import Login from "./Components/Login"
import Profile from "./Components/Profile";
import { Provider } from "react-redux";
import AppStore from "./Utils/appStore";
import Feed from "./Components/feed";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {path:"feed",element:<Feed/>},
        { path: "login", element: <Login /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={AppStore}>
        <RouterProvider router={router} />;
      </Provider>
    </>
  );
}

export default App;
