import { lazy } from "react";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

const HostLayout = lazy(() => import("./components/HostLayout"));
const Home = lazy(() => import("./components/home/Home"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Contact = lazy(() => import("./components/Contact"));
const SchedulePickup = lazy(() => import("./components/SchedulePickup"));
const TrackOrder = lazy(() => import("./components/TrackOrder"));
const PageNotFound = lazy(() => import("./ui/PageNotFound"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<HostLayout />}>
      <Route index path="/" element={<Home />} />
      <Route path="schedule-pickup" element={<SchedulePickup />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} />
      <Route path="track-order" element={<TrackOrder />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f7f7f7",
            color: "#313131",
          },
        }}
      />
    </>
  );
}

export default App;
