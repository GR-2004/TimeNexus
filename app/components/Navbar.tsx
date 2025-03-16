import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png"

export function Navbar(){
    return (
        <div className="flex py-5 items-center justify-between bg-red-500">
            <Link href="/">
                <Image src={Logo} alt="Logo" className="size-10" />
            </Link>
        </div>
    )
}