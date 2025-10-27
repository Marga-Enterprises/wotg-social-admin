// react router dom
import { Routes, Route } from 'react-router-dom';

// routers
import AuthRouter from '@routers/AuthRouter';
import AdminRouter from '@routers/AdminRouter';
import NonAuthRouter from '@routers/NonAuthRouter';

// pages
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import BlogsPage from '@pages/BlogsPage';
import EditBlogPage from '@pages/EditBlogPage';
import AlbumsPage from '@pages/AlbumsPage';
import MusicsPage from '@pages/MusicsPage';
import PostsPage from '@pages/PostsPage';
import UsersPage from '@pages/UsersPage';

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
          <AdminRouter>
            <MainLayout />
          </AdminRouter>
        }
      >
        <Route index element={<BlogsPage />} />
      </Route>

      <Route
        path="/blogs/edit/:id"
        element={
          <AdminRouter>
            <MainLayout />
          </AdminRouter>
        }
      >
        <Route index element={<EditBlogPage />} />
      </Route>

      <Route
        path="/albums"
        element={
          <AdminRouter>
            <MainLayout />
          </AdminRouter>
        }
      >
        <Route index element={<AlbumsPage />} />
      </Route>

      <Route
        path="/musics"
        element={
          <AdminRouter>
            <MainLayout />
          </AdminRouter>
        }
      >
        <Route index element={<MusicsPage />} />
      </Route>

      <Route
        path="/posts"
        element={
          <AdminRouter>
            <MainLayout />
          </AdminRouter>
        }
      >
        <Route index element={<PostsPage />} />
      </Route>

      <Route
        path="/users"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
