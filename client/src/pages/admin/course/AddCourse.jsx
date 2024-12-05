import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi.js";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [createCourse, { data, isLoading, error, isError, isSuccess }] =
    useCreateCourseMutation();
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const getSelectCourse = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic details for your new course
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nostrum.
        </p>
      </div>
      <div className="space-y-4">
        <Label>Title</Label>
        <Input
          type="text"
          value={courseTitle}
          name="courseTitle"
          placeholder="Your Course Name"
          onChange={(e) => setCourseTitle(e.target.value)}
        />

        <div className="mt-5">
          <Label className="mb-5">Category</Label>
          <Select onValueChange={getSelectCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="FrontEnd Developer">
                  FrontEnd Developer
                </SelectItem>
                <SelectItem value="Back Developer">Back Developer</SelectItem>
                <SelectItem value="Full stack Developer">
                  Full stack Developer
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Button variant="outline">Cancel</Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
