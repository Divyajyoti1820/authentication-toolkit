"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Navbar } from "../_components/navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Settings2Icon } from "lucide-react";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  const onClick = () => {
    settings({
      name: "New Name!",
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick}>Update name</Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
