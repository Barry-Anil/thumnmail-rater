"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"

export function Header() {
    return (
        <div className=" border-b">
            <div className="h-16 container flex justify-between items-center">
                <div >Blog Connect</div>

                <div className="flex gap-8">
                    <SignedIn>
                        <Link href="/dashboard" className="link">
                            Dashboard
                        </Link>
                        <Link href="/create" className="link">
                            Create
                        </Link>
                        <Link href="/explore" className="link">
                            Explore
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/pricing" className="link">
                            Pricing
                        </Link>
                        <Link href="/about" className="link">
                            About
                        </Link>
                    </SignedOut>
                </div>


                <div className="flex gap-4 items-center">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut></SignedOut>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}