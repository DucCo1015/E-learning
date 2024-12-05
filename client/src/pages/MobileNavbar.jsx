import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import DarkMode from "./DarkMode";
import { useLogoutUserMutation } from "@/features/api/authApi.js";
import { toast } from "sonner";

const MobileNavbar = () => {
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged out");
      navigate("/login");
    }
  }, [isSuccess]);

  const role = "instructor";
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-300"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-row items-center justify-between mt-7">
            <SheetTitle>E-Learning</SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <Link
              to={"my-learning"}
              className="hover:bg-gray-400 py-2 cursor-pointer"
            >
              My Learning
            </Link>
            <Link
              to={"profile"}
              className="hover:bg-gray-400 py-2 cursor-pointer "
            >
              Edit Profile
            </Link>
            <Button
              onClick={logoutHandler}
              className="hover:bg-gray-400 py-2 cursor-pointer"
              variant="ghost"
            >
              Log Out
            </Button>
          </nav>
          {role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button className="mt-4" type="submit">
                  Dashboard
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
