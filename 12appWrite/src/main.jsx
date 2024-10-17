import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import {Login, AuthLayout, Signup } from './components/index.js'


import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./Pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />,
      },

      {
      path: "/login",
      element: (
          <AuthLayout authentication={false}>
              <Login />
          </AuthLayout>
      ),
      },

      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayout authentication ={false}>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication ={false}>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication ={false}>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },

    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
