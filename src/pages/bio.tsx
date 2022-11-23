import { ThemeProvider } from "next-themes";
import { Bio } from "../components/bio";

export default function BioPage() {
    return (
        <>
        <ThemeProvider attribute="class" defaultTheme="system">
            <Bio />
        </ThemeProvider>
        </>
    )
}
