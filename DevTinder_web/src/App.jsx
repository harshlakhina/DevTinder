import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Provider } from "react-redux";
import AppStore from "./Utils/appStore";
import Feed from "./Components/feed";
import Connections from "./Components/connections";
import Requests from "./Components/requests";
import Premium from "./Components/premium";
import Success from "./Components/success";
import Failure from "./Components/failure";
import Chat from "./Components/chat";
import SignUp from "./Components/sign-up";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "feed", element: <Feed /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "profile", element: <Profile /> },
        { path: "connections", element: <Connections /> },
        { path: "/requests", element: <Requests /> },
        { path: "/premium", element: <Premium /> },
        { path: "success", element: <Success /> },
        { path: "failure", element: <Failure /> },
        { path: "chat/:targetId", element: <Chat /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={AppStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
