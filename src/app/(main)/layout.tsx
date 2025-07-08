import Navbar from "@/app/(main)/Navbar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );

}