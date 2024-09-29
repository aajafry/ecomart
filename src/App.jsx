import { AppRoutes } from "./AppRoutes";
import { CartProvider } from './contexts/CartContext';
import { SidebarProvider } from "./contexts/SidebarContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WishlistProvider } from "./contexts/WishlistContext";

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
