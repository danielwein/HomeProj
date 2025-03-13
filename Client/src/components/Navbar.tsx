import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { Github } from "lucide-react";
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react';
import {logout} from "@/components/HandleConnection"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  var Username = localStorage.getItem("email") 
    Username  = Username ? Username.split('@')[0] : null 
  // Determine if the theme is dark
  
  const location = useLocation();

  // Check if the current path is '/login' or '/signup'
  if (location.pathname.toLowerCase() === '/login' || location.pathname.toLowerCase() === '/sign') {
    return null; // Don't render the navbar for these routes
  }
  return (
    <nav className="flex items-center justify-between p-4 px-8 border-b border-[#1f2937]" style={{ paddingLeft: "15vw", paddingRight: "15vw" }}>
      {Username ? (<div className="flex items-center " >
         <Link to="/dashboard" className="">
         <h1 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white" style={{marginRight:"1rem"}}>
        <Github className="w-6 h-6 mr-2 text-black-800 dark:text-white" />
        ZipHub
      </h1>
      </Link>
       <Link to="/dashboard" className="" style={{marginRight:"1rem"}}>
       Repositories
     </Link>
      <Link to="https://www.youtube.com/watch?v=xvFZjo5PgG0" className="">
      Explore
    </Link>
       </div>
          
      ) : (
        <h1 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
        <Github className="w-6 h-6 mr-2 text-black-800 dark:text-white" />
        ZipHub
      </h1>
      )}

      <div className="ml-auto flex gap-4">
        <ModeToggle  />
       {Username ? (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" style={{cursor: "pointer"}}> <User />{Username}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Profile

                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Settings

                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() =>
                         {logout();navigate('/',{replace:true});}

                        }>
                        Log out

                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                    </DropdownMenu>



       ):(    <div>

              <Link to="/Login" className={buttonVariants({ variant: "ghost" })}>
                        Login
                      </Link>

                      <Link
                        to="/Sign"
                        className={buttonVariants({
                          variant: "default", // If dark mode, outline, otherwise solid
                         
                        })}
                      >
                        Sign Up
                      </Link>
                      </div>


       )}
      </div>
    </nav>
  );
};

export default Navbar;
