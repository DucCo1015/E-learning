import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Courses from "./Courses";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi.js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) {
    return <h1>Profile loading...</h1>;
  }
  const enrolledCourses = [];

  const user = data && data.user;

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left ">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start mt-5">
        <div className="flex flex-col items-center mb-4 mr-3">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
              Name:
              <span className="font-normal tex-gray-700 dark-text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
              Email:
              <span className="font-normal tex-gray-700 dark-text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
              Role:
              <span className="font-normal tex-gray-700 dark-text-gray-300 ml-2">
                {user?.role.toUpperCase()}
              </span>
            </h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="st-2" size="sm">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you've done
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="cols-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                  />
                </div>
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label>Photo</Label>
                  <Input
                    type="file"
                    placeholder="Name"
                    accept="image/*"
                    className="cols-span-3"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="">
        <h1 className="font-medium text-lg">Course you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-5">
          {user?.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            enrolledCourses.map((course, index) => (
              <Courses key={index} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
