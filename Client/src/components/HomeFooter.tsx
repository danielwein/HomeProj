import { Link } from "react-router-dom";

const HomeFooter = () => {

  // Determine if the theme is dark

  return (
    <nav className="flex items-center justify-between p-4 px-8 border-t border-[#1f2937]" style={{ paddingLeft: "15vw", paddingRight: "15vw"}}>
      <h3 className="flex items-center text-s font-bold text-gray-800" style={{color:"hsl(var(--muted-foreground))"}} >
      © 2025 ZipHub. All rights reserved.
      </h3>

      <div className="ml-auto flex gap-4">
        <Link to="/Terms" className="underline underline-offset-4 text-gray-800 "style={{color:"hsl(var(--muted-foreground))"}}> Terms </Link>

        {/* Button to Sign Up, styled opposite of current theme */}
        <Link to="/Privacy" className="underline underline-offset-4 text-gray-800" style={{color:"hsl(var(--muted-foreground))"}}> Privacy </Link>
      </div>
    </nav>
  );
};

export default HomeFooter;
