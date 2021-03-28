import Home from "../pages/Home"
import StudentForm from "../pages/StudentForm"
import DisplayStudent from "../pages/DisplayStudent"
import Error404 from "../pages/Error404"
 
export default [
    {
        path: "/",
        exact: true,
        page: Home
    },

    {
        path: "/StudentForm/:id",
        exact: true,
        page: StudentForm
    },

    {
        path: "/StudentForm/",
        exact: true,
        page: StudentForm
    },

    {
        path: "/DisplayStudent",
        exact: true,
        page: DisplayStudent
    },

    {
        path: "*",
        page: Error404
    }
];