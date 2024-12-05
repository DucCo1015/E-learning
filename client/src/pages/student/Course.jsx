import React from "react";
import Courses from "./Courses";
import { Skeleton } from "@/components/ui/skeleton";

const Course = () => {
  const course = [1, 2, 3, 4, 5, 6];
  const isLoading = false;
  return (
    <div className="mt-5">
      <div className="max-w-7xl mx-auto gap-8">
        <h2 className="font-bold text-3xl text-center mb-5">Our Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-10">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : course.map((course, index) => <Courses key={index} />)}
        </div>
      </div>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-/4" />
      </div>
    </div>
  );
};

export default Course;
