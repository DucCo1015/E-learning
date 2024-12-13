import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const gotoUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1f1f1f] px-4 py-2 rounded-md ">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture - {index + 1} : {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={gotoUpdateLecture}
        size={20}
        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 darK:hover:text-blue-400"
      />
    </div>
  );
};

export default Lecture;
