import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="w-full max-w-[400px] mx-auto">
                <CardContent className="p-6 flex flex-col w-full items-center">
                    <div className="size-16 bg-green-500/10 rounded-full flex justify-center items-center">
                    <Check className="size-8 text-green-500"/>
                    </div>
                    <h1 className="text-2xl font-semibold mt-4">This event is scheduled</h1>
                    <p className="text-sm font-medium text-muted-foreground mt-2 text-center">
                        You will receive an email confirmation shortly!
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}