import HomeSection from "../components/home-page-components/HomeSection";
import RecruitersLogos from "../components/home-page-components/RecruitersLogo";
import Accordation from "../components/home-page-components/Accordation";
import SendMail from "../components/home-page-components/sendMails";
const HomePage = () => {
  return (
    <>
      <main className="col-12">
        <HomeSection />

        <RecruitersLogos />
        {/* <TeamSection /> */}
        <Accordation />
        <SendMail />
      </main>
    </>
  );
};

export default HomePage;
