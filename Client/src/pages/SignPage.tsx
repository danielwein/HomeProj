import { SignForm } from "@/components/sign-form"
import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { Github } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function LoginPage() {
  return (
    <div>
         <nav className="flex items-center justify-between p-4 px-8 ]">

<Link
    to="/"
    className={buttonVariants({
      variant: "ghost", // If dark mode, outline, otherwise solid
    })}
  >
     <h1 className="flex items-center text-l font-bold text-gray-800 dark:text-white">
  <Github className="w-6 h-6 mr-2 text-black-800 dark:text-white" />
  ZipHub
</h1>
  </Link>

<div className="ml-auto flex gap-4">
  <ModeToggle />
</div>
</nav>
    <div className="flex  w-full items-center justify-center p-6 md:p-10" style={{minHeight: "90svh"}}>
      <div className="w-full max-w-sm">
        <SignForm/>
      </div>
    </div></div>
  )
}