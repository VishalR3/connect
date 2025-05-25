"use client";
import CollapsibleSection from "@/components/common/collapsible-section";
import StickyHeader from "@/components/common/sticky-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useGetUserQuery } from "@/lib/features/userService";
import { Settings } from "lucide-react";

export default function ProfilePage() {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(session?.user.id, {
    skip: isPending || !session?.user.id,
  });

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    designation: "Software Developer",
    joiningDate: "2022-01-15",
    employeeId: "EMP-001",
    manager: "Jane Smith",
    location: "New York, USA",
    emergencyContact: {
      name: "Mary Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      <StickyHeader className="px-4 border-b gap-4">
        <div>
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/vishalr3.png" />
            <AvatarFallback>
              {session?.user.name.split(" ").reduce((a, b) => a[0] + b[0], "")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 grid grid-rows-2">
          <div className="text-lg font-bold">{session?.user.name}</div>
          <div className="text-sm text-muted-foreground">
            {profileData.designation}
          </div>
        </div>
        <div>
          <Settings />
        </div>
      </StickyHeader>
      <div>
        <CollapsibleSection header="Personal Information" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Full Name</p>
              <p className="text-sm text-muted-foreground">
                {profileData.name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">
                {profileData.email}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Phone Number</p>
              <p className="text-sm text-muted-foreground">
                {profileData.phone}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">
                {profileData.location}
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
      <div>
        <CollapsibleSection header="Employment Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Employee ID</p>
              <p className="text-sm text-muted-foreground">
                {profileData.employeeId}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Department</p>
              <p className="text-sm text-muted-foreground">
                {profileData.department}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Designation</p>
              <p className="text-sm text-muted-foreground">
                {profileData.designation}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Joining Date</p>
              <p className="text-sm text-muted-foreground">
                {profileData.joiningDate}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Manager</p>
              <p className="text-sm text-muted-foreground">
                {profileData.manager}
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
      <div>
        <CollapsibleSection header="Emergency Contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">
                {profileData.emergencyContact.name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Relationship</p>
              <p className="text-sm text-muted-foreground">
                {profileData.emergencyContact.relationship}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Phone Number</p>
              <p className="text-sm text-muted-foreground">
                {profileData.emergencyContact.phone}
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
