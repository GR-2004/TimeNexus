import { CancelMeetingAction } from "@/app/action";
import { EmptyState } from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

export default async function MeetingPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No Meetings Found"
          description="You don't have any meetings scheduled yet."
          buttonText="Create a new meeting"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Meetings</CardTitle>
            <CardDescription>View all your meetings</CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((event) => (
              <form action={CancelMeetingAction}>
                <input type="hidden" name="eventId" value={event.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {format(
                        fromUnixTime(event.when.startTime),
                        "EEE, dd MMM"
                      )}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {format(fromUnixTime(event.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(event.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 text-primary mr-2" />
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        href={event.conferencing.details.url}
                        target="_blank"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{event.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {event.participants[0].name}
                    </p>
                  </div>

                  <SubmitButton
                    text="Cancel Event"
                    variant={"destructive"}
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
