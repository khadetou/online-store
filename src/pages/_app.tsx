import "@/styles/globals.css";
import "rc-drawer/assets/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
import { CartProvider } from "react-use-cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default wrapper.withRedux(MyApp);
