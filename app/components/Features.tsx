import { CalendarCheck, Zap, Lock, ThumbsUp } from "lucide-react";

const features = [
    {
      name: "Sign up for free",
      description:
        "Get started with our calendar platform without any cost. No credit card required—just sign up and start scheduling!",
      icon: CalendarCheck,
    },
    {
      name: "Blazing fast",
      description:
        "Experience lightning-fast performance with real-time updates, ensuring smooth scheduling and seamless collaboration.",
      icon: Zap,
    },
    {
      name: "Super secure with Nylas",
      description:
        "Your data is protected with industry-leading encryption and secure API integrations powered by Nylas.",
      icon: Lock,
    },
    {
      name: "Easy to use",
      description:
        "A user-friendly interface designed for effortless scheduling, making it simple for anyone to organize their time effectively.",
      icon: ThumbsUp,
    },
  ];

export function Features() {
  return (
    <div className="py-24">
       <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule Smarter, Not Harder</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Plan, Schedule, and Connect Instantly
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With TimeNexus, organizing meetings has never been easier. Say goodbye to endless email chains and scheduling conflicts—get things done in just a few clicks!
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}