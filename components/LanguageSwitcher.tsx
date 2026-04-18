'use client'

import { useTranslation } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2 hover:bg-slate-100 transition-colors">
          <Globe className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold uppercase text-slate-600">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl border shadow-lg">
        <DropdownMenuItem 
          onClick={() => setLanguage('id')}
          className={language === 'id' ? "bg-slate-50 font-bold" : ""}
        >
          Bahasa Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={language === 'en' ? "bg-slate-50 font-bold" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
