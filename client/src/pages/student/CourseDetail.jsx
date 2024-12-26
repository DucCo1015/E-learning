import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BuyCourseButton from "../BuyCourseButton";

const CourseDetail = () => {
  const purchasedCourse = false;
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  // const handleContinueCourse = () => {
  //   if (purchased) {
  //     navigate(`/course-progress/${courseId}`);
  //   }
  // };
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md-px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>

          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Create By{" "}
            <span className="text-[#c0c4fc] underline italic">
              Patel MernStack
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last update 11-11-2024</p>
          </div>

          <p>Student enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            laboriosam nesciunt suscipit fugit ea, consequuntur molestiae
            temporibus ullam nulla cupiditate.Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Officia laboriosam nesciunt suscipit
            fugit ea, consequuntur molestiae temporibus ullam nulla cupiditate
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Course Title</CardTitle>
              <CardDescription>4 Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((lecture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>lecture title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                React player Video ayega
              </div>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                Lecture title
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchasedCourse ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
