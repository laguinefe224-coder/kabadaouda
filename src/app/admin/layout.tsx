'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Newspaper, Phone, MessageSquare, LogOut, Bot } from "lucide-react";
import AuthGuard from "@/components/auth-guard";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/login');
  };

  const pathname = usePathname();

  const menuItems = [
    { href: "/admin/news", tooltip: "News", icon: <Newspaper />, label: "News" },
    { href: "/admin/directory", tooltip: "Annuaire", icon: <Phone />, label: "Annuaire" },
    { href: "/admin/messages", tooltip: "Messages", icon: <MessageSquare />, label: "Messages" },
    { href: "/admin/assistant", tooltip: "Assistant", icon: <Bot />, label: "Assistant" },
  ];

  return (
    <AuthGuard>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="hidden md:flex justify-between items-center bg-ryg">
            <Link href="/" className="text-white font-headline text-2xl font-black p-2">
              DK
            </Link>
            <SidebarTrigger className="text-white hover:bg-white/20 hover:text-white" />
          </SidebarHeader>
          <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                   <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild tooltip={item.tooltip} isActive={pathname.startsWith(item.href)}>
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
                        <LogOut />
                        <span>Déconnexion</span>
                    </button>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-16 items-center justify-between gap-4 bg-ryg px-4 md:hidden shadow-xl">
              <Link href="/" className="text-white font-headline text-2xl font-black">
                DK
              </Link>
              <SidebarTrigger className="text-white hover:bg-white/20 hover:text-white" />
            </header>
            <div className="flex-1">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
