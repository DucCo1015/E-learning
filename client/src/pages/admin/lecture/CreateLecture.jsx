import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation } from "@/features/api/courseApi.js";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const param = useParams();
  const courseId = param.courseId;
  const navigate = useNavigate();
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
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
          value={lectureTitle}
          name="courseTitle"
          placeholder="Your Course Name"
          onChange={(e) => setLectureTitle(e.target.value)}
        />
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Button
          onClick={() => navigate(`/admin/course/${courseId}`)}
          variant="outline"
        >
          Back
        </Button>
        <Button disabled={isLoading} onClick={createLectureHandler}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait...
            </>
          ) : (
            "Create lecture"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateLecture;
