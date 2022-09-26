import { ThemeProvider } from "next-themes";
import { Status } from "../components/status";

export default function StatusPage() {
  return (
    <>
    <ThemeProvider attribute="class" defaultTheme="system">
        <Status />
    </ThemeProvider>
    </>
  )
}
