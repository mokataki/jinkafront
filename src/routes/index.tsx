import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import ListProducts from "../pages/AdminPanel/Products/ListProducts.tsx";
import DeleteProduct from "../pages/AdminPanel/Products/DeleteProduct.tsx";
import EditProduct from "../pages/AdminPanel/Products/EditProduct.tsx";
import CreateProduct from "../pages/AdminPanel/Products/CreateProduct.tsx";
import ListBrands from "../pages/AdminPanel/Brands/ListBrands.tsx";
import DeleteBrand from "../pages/AdminPanel/Brands/DeleteBrand.tsx";
import EditBrand from "../pages/AdminPanel/Brands/EditBrand.tsx";
import CreateBrand from "../pages/AdminPanel/Brands/CreateBrand.tsx";
import ListCategories from "../pages/AdminPanel/Categories/ListCategories.tsx";
import DeleteCategory from "../pages/AdminPanel/Categories/DeleteCategory.tsx";
import EditCategory from "../pages/AdminPanel/Categories/EditCategory.tsx";
import CreateCategory from "../pages/AdminPanel/Categories/CreateCategory.tsx";
import ListColors from "../pages/AdminPanel/Colors/ListColors.tsx";
import DeleteColor from "../pages/AdminPanel/Colors/DeleteColor.tsx";
import EditColor from "../pages/AdminPanel/Colors/EditColor.tsx";
import CreateColor from "../pages/AdminPanel/Colors/CreateColor.tsx";
import ListTags from "../pages/AdminPanel/Tags/ListTags.tsx";
import DeleteTag from "../pages/AdminPanel/Tags/DeleteTag.tsx";
import EditTag from "../pages/AdminPanel/Tags/EditTag.tsx";
import CreateTag from "../pages/AdminPanel/Tags/CreateTag.tsx";
import ListArticles from "../pages/AdminPanel/Articles/ListArticles.tsx";
import DeleteArticle from "../pages/AdminPanel/Articles/DeleteArticle.tsx";
import EditArticle from "../pages/AdminPanel/Articles/EditArticle.tsx";
import CreateArticle from "../pages/AdminPanel/Articles/CreateArticle.tsx";
import ListArticleCategories from "../pages/AdminPanel/ArticleCategories/ListArticleCategories.tsx";
import CreateArticleCategory from "../pages/AdminPanel/ArticleCategories/CreateArticleCategory.tsx";
import EditArticleCategory from "../pages/AdminPanel/ArticleCategories/EditArticleCategory.tsx";
import DeleteArticleCategory from "../pages/AdminPanel/ArticleCategories/DeleteArticleCategory.tsx";

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const AdminDashboard = lazy(() => import('../pages/AdminPanel/Dashboard'));

const routes: RouteObject[] = [
    // Public Routes
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },

    // Auth Routes (conditionally rendered based on authentication)
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },

    // Protected Routes (Only accessible by authenticated users)
    {
        path: '/admin',
        element: (
            <ProtectedRoute roles="ADMIN"> {/* Only allow admins */}
                <AdminDashboard />
            </ProtectedRoute>
        ),
        children: [
            // Products Routes
            { path: 'products', element: <ListProducts /> },
            { path: 'products/create', element: <CreateProduct /> },
            { path: 'products/edit', element: <EditProduct /> },
            { path: 'products/delete', element: <DeleteProduct /> },

            // Articles Routes
            { path: 'articles', element: <ListArticles /> },
            { path: 'articles/create', element: <CreateArticle /> },
            { path: 'articles/edit', element: <EditArticle /> },
            { path: 'articles/delete', element: <DeleteArticle /> },

            { path: 'articles-category', element: <ListArticleCategories /> },
            { path: 'articles-category/create', element: <CreateArticleCategory /> },
            { path: 'articles-category/edit', element: <EditArticleCategory /> },
            { path: 'articles-category/delete', element: <DeleteArticleCategory /> },

            // Tags Routes
            { path: 'tags', element: <ListTags /> },
            { path: 'tags/create', element: <CreateTag /> },
            { path: 'tags/edit', element: <EditTag /> },
            { path: 'tags/delete', element: <DeleteTag /> },

            // Colors Routes
            { path: 'colors', element: <ListColors /> },
            { path: 'colors/create', element: <CreateColor /> },
            { path: 'colors/edit', element: <EditColor /> },
            { path: 'colors/delete', element: <DeleteColor /> },

            // Categories Routes
            { path: 'categories', element: <ListCategories /> },
            { path: 'categories/create', element: <CreateCategory /> },
            { path: 'categories/edit', element: <EditCategory /> },
            { path: 'categories/delete', element: <DeleteCategory /> },

            // Brands Routes
            { path: 'brands', element: <ListBrands /> },
            { path: 'brands/create', element: <CreateBrand /> },
            { path: 'brands/edit', element: <EditBrand /> },
            { path: 'brands/delete', element: <DeleteBrand /> },
        ],
    },
];

export default routes;
