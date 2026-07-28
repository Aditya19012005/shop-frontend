// Yeh root component hai jo shared layout aur route-based pages ko combine karta hai.
import { Header } from "./components/Header/Header";
import { AppRoutes } from "./routes/routes";

/**
 * Yeh global application shell ko render karta hai,
 *  jisme shared header
 * aur active route ka content hota hai.
 */
function App() {
  return (
    <>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
