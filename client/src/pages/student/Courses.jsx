import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import nextImg from "../../assets/nextjs.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Courses = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={nextImg}
          alt=""
          className="w-full h-36  object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover-underline font-bold text-lg truncate">
          NextJs Complete Course in Hindi 2024
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm  ml-3">Patel Stack</h1>
          </div>

          <Badge
            className={"bg-blue-600 text-white px-2 py-1 text-xs rounded-full"}
          >
            Advance
          </Badge>
        </div>
        <div className="text-lg font-bold flex items-center justify-between ">
          <span>Total: </span>
          <span>$100</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Courses;
