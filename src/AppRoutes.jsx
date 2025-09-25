// react router dom
import { Routes, Route } from 'react-router-dom';

// routers
import AuthRouter from '@routers/AuthRouter';
import NonAuthRouter from '@routers/NonAuthRouter';

// pages
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import BlogsPage from '@pages/BlogsPage';
import EditBlogPage from '@pages/EditBlogPage';

// layout
import MainLayout from '@components/layout/MainLayout';

function AppRoutes() {
  return (
    <Routes>
      {/* Non-Authenticated routes */}
      <Route
        path="/login"
        element={
          <NonAuthRouter>
            <LoginPage />
          </NonAuthRouter>
        }
      />

      {/* Authenticated routes */}
      <Route
        path="/"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<HomePage />} />
      </Route>

      <Route
        path="/blogs"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<BlogsPage />} />
      </Route>

      <Route
        path="/blogs/edit/:id"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<EditBlogPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
