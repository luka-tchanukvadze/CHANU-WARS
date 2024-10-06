import Footer from "@/components/OnlineShop/Footer";
import Header from "@/components/OnlineShop/Header";
import OrderHistory from "@/components/OnlineShop/OrderHistory";
import TemporaryHeader from "@/components/OnlineShop/Temporary/TemporaryHeader";

function page() {
  return (
    <>
      <TemporaryHeader />
      <OrderHistory />
      <Footer />
    </>
  );
}
export default page;
