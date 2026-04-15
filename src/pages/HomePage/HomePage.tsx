import DeferredSection from "../../components/DeferredSection/DeferredSection";
import lazyWithPreload from "../../utils/lazyWithPreload";
import AdSection from "./components/AdSection/AdSection";
import DomenSection from "./components/DomenSection/DomenSection";
import PortfolioSection from "./components/PortfolioSection/PortfolioSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import SupportSection from "./components/SupportSection/SupportSection";
import WelcomeSection from "./components/WelcomeSection/WelcomeSection";
import WhyUsSection from "./components/WhyUsSection/WhyUsSection";

const StagesSection = lazyWithPreload(() => import("./components/StagesSection/StagesSection"));
const FAQSection = lazyWithPreload(() => import("./components/FAQSection/FAQSection"));
const OthersSection = lazyWithPreload(() => import("../../components/OthersSection/OthersSection"));

const HomePage = () => {
    return(
        <main id='homePage'>
            <WelcomeSection />
            <AdSection />
            <ServicesSection />
            <DomenSection />
            <PortfolioSection />
            <WhyUsSection />
            <SupportSection />
            <DeferredSection component={StagesSection} minHeight={560} rootMargin='1800px 0px'/>
            <DeferredSection component={FAQSection} minHeight={920} rootMargin='1600px 0px'/>
            <DeferredSection component={OthersSection} minHeight={520} rootMargin='1400px 0px'/>
        </main>
    )
}

export default HomePage;
