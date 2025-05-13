import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PublicPage } from './pages';
import ScrollToTop from './components/OtherComponent/ScrollToTop';

function App() {
  return (
    <Router>
      <div>
        <ScrollToTop />
        <Routes>
          {PublicPage.map((page, index) => {
            const Page = page.component;
            const Layout = page.layout;

            // Ensure Page and Layout are valid components
            if (!Page) {
              console.error(`Page component is missing for path: ${page.path}`);
              return null;
            }

            if (Layout == null) {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={<Page />}
                />
              );
            } else {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            }
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;