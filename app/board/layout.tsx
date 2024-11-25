import type { Metadata } from "next";
import { AsideSection } from "@/components/common";

export const metadata: Metadata = {
    title: "TODO-BOARD 만들기",
    description: "Shadcn UI 및 Supabase를 활용한 나만의 TODO-BOARD 만들기",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="page">
            <AsideSection />
            <main className="page__main">{children}</main>
        </div>
    );
}
