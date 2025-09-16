import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Title from "@/components/ui/Title";

const notifications = [
  {
    id: 1,
    title: "New message from John Doe",
    description: "Hey, how are you doing?",
    time: "10 minutes ago",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    title: "Your order has been shipped",
    description: "Your order #12345 has been shipped and is on its way.",
    time: "1 hour ago",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    title: "New follower",
    description: "Jane Smith is now following you.",
    time: "2 hours ago",
    avatar: "https://github.com/shadcn.png",
  },
];

const Notification = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Notifications...</div>}>
      <div>
        <Title title="Notifications" />
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start p-4 rounded-lg border bg-card"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={notification.avatar} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{notification.title}</h2>
                  <p className="text-xs">{notification.time}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Notification;