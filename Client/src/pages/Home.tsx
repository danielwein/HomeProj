import HomeFooter from "@/components/HomeFooter";
import FirstPartHome from "@/components/FirstPartHome";
import Howitworks from "@/components/HowItWorks";
import Recommendations from "@/components/Recommendations";
import Resize from "@/components/Resize";
const Home = () =>
    {return (
     <div style={{padding:"0"}}>
    <FirstPartHome />
    <Howitworks/>
    <Resize />
    <Recommendations />
    
   <div style={{paddingTop:"2rem"}}>
    <HomeFooter/>
    </div> 
    </div>
);}
    



export default Home;