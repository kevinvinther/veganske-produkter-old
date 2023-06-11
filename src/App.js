import { lazy, Suspense } from 'react';
import { Redirect, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import TopNavigation from './TopNavigation';

const HomePage = lazy(() => import('./HomePage'));
const ContactPage = lazy(() => import('./ContactPage'));

const { Header, Content, Footer } = Layout;

function App() {
        // Check if the current protocol is not HTTPS
        const isHTTP = window.location.protocol === 'http:';

        // If it's not HTTPS, redirect to the secure version
        if (isHTTP) {
                return <Redirect to={`https://${window.location.host}${window.location.pathname}`} />;
        }
        return (
                <Router>
                        <Layout className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                                <Header>
                                        <TopNavigation />
                                </Header>
                                <Content style={{ padding: '0 50px', flex: '1 0 auto' }}>
                                        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>}>
                                                <Routes>
                                                        <Route path="/" element={<HomePage />} />
                                                        <Route path="/contact" element={<ContactPage />} />
                                                </Routes>
                                        </Suspense>
                                </Content>
                                <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5', borderTop: '1px solid #d9d9d9' }}></Footer>
                        </Layout>
                </Router>
        );
}

export default App;
