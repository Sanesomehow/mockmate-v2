import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ThemeProvider.tsx"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mockmate",
  description: "AI-Powered Online Mock Interview Evaluation System",
  icons: {
    icon: '/MockMateLogo.png',
    shortcut: '/MockMateLogo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider >
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="white"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
