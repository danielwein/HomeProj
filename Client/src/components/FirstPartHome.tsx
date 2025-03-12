import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider";  // Assuming this is your custom hook
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import {ArrowRight} from "lucide-react"

export default function FirstPartHome() {
    const { theme } = useTheme();
    const isDarkMode = theme === "dark";

  return (
    <div className="flex min-h-svh w-full items-center justify-center" style={{flexDirection: "column",paddingLeft:'32%',paddingRight:'32%'}}>
            <Badge variant="secondary" style={{fontSize:"15px", borderRadius: "calc(infinity * 1px)",borderColor: "gray"}}>Simple Code Management</Badge> 
            <h1 style={{fontSize: "3.75rem",textAlign:'center',fontWeight: "700"}}>Store and manage your code with ease </h1>
            <h1 style={{fontSize: "1.25rem",textAlign:'center'}}>Upload ZIP files, browse code, and collaborate with your team. No Git required. </h1>
            <div style={{display:"flex",justifyContent: 'space-between',marginTop:"4vh"}}>
            <Link
          to="/Sign"
          className={buttonVariants({
            variant: "default", // If dark mode, outline, otherwise solid
            className: isDarkMode ? "bg-white text-black" : "bg-black text-white"  // Opposite colors
          })}
         style={{marginRight:"1vw",}}>
          Get Started  <ArrowRight  />
        </Link>
        <Link to="/Login" className={buttonVariants({
             variant: "ghost", // If dark mode, outline, otherwise solid
             className:  isDarkMode ?  "bg-black text-white" : "bg-white text-black"  // Opposite colors
})}>
          Sign In
        </Link>
     
            </div>
               <div className="container border-t border-[#1f2937]" style={{marginTop:"2vh",}}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" style={{marginTop:"4vh",}}>
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">10,000+</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Repositories</p>
        </div>

        {/* Column 2 */}
        <div >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5,000+</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Developers</p>
        </div>

        {/* Column 3 */}
        <div >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Uptime</p>
        </div>
      </div>
    </div>

    </div>
  );   
}