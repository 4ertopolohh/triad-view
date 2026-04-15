import { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router';

import DefaultLoader from './components/DefaultLoader/DefaultLoader';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import './styles/base.scss'
import Footer from './components/Footer/Footer';

const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage/PortfolioPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage/ReviewsPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage/ArticlesPage'));
const ChatPage = lazy(() => import('./pages/ChatPage/ChatPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const navItems = [
  { label: 'Главная', to: '/' },
  { label: 'Услуги', to: '/services' },
  { label: 'Портфолио', to: '/portfolio' },
  { label: 'Отзывы', to: '/reviews' },
  { label: 'Статьи', to: '/articles' },
]

type AppLayoutProps = {
  navItems: {
    label: string
    to: string
  }[]
}

const AppLayout = ({ navItems }: AppLayoutProps) => {
  return (
    <>
      <Header navItems={navItems} />
      <Suspense fallback={<DefaultLoader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout navItems={navItems} />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App;
