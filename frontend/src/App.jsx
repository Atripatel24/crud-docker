import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Form from './Component/Form'
import Layout from './Layout'
import Table from './Component/Table'

function App() {
  const [count, setCount] = useState(0)

  const route = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path:'/',
          element:<Form />
        },
        {
          path: '/table',
          element: <Table />
        },
        {
          path:'/user/:id',
          element:<Form />
        }
      ]
    },

  ])

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
