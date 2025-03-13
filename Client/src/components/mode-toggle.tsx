import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")
      }
      style={{cursor: "pointer"}}>
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-black-500" />
      ) : (
        <Sun className="h-5 w-5 text-gray-800" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
