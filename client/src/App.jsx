import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import HeroSelection from "./pages/student/HeroSelection";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Course from "./pages/student/Course";
import MyLearning from "./pages/student/Mylearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/lecture/Sidebar";
import Dashboard from "./pages/admin/lecture/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSelection />
              <Course />
            </>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "my-learning",
          element: <MyLearning />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "admin",
          element: <Sidebar />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "course",
              element: <CourseTable />,
            },
            {
              path: "course/create",
              element: <AddCourse />,
            },
            {
              path: "course/:courseId",
              element: <EditCourse />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
