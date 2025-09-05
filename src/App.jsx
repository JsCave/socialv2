import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout.JSX";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import FeedPage from "./Pages/FeedPage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedRoutes/ProtectedAuthRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Profile from "./Pages/Profile";

export const client=new QueryClient()

const router=createBrowserRouter([
{path:'',element:<AuthLayout/>,children:[
  {path:'login',element:<ProtectedAuthRoute><LoginPage/></ProtectedAuthRoute>},
{path:'register',element:<ProtectedAuthRoute><RegisterPage/></ProtectedAuthRoute>},
]},
{path:'',element:<MainLayout/>,children:[
{index:true,element:<ProtectedRoute><FeedPage/></ProtectedRoute>},
{path:'post-details/:id',element:<ProtectedRoute><PostDetailsPage/></ProtectedRoute>},
{path:'profile',element:<ProtectedRoute><Profile/></ProtectedRoute>},
{path:'*',element:<NotFoundPage/>},
]}
])
export default function App() {
  return (
    <>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
    <RouterProvider router={router}/>
    </QueryClientProvider>
    </>
  )
}
