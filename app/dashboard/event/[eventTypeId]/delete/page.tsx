import { DeleteEventAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteEventPage({
  params
}: {
  params: { eventTypeId: string };
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Delete Event</CardTitle>
          <CardDescription>
            Are you sure you want to delete this event?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between items-center">
          <Button variant={"secondary"} asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventAction}>
            <input type="hidden" name="eventId" value={params.eventTypeId} />
            <SubmitButton text="Delete Event" variant={"destructive"}  />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
