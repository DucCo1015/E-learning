import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi.js";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery();
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Link to={"create"}>
        <Button>Create a new course</Button>
      </Link>

      <div className="mt-5">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[150px]">Price</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[150px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {course.courseTitle}
                </TableCell>
                <TableCell>{course?.coursePrice || "NA"}</TableCell>
                <TableCell>
                  <Badge> {course.isPublished ? "Publish" : "Draft"}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => navigate(`${course._id}`)}
                    variant="outline"
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
