import { Button } from "@/components/ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi.js";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const BuyCourseButton = ({ courseId }) => {
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      await createCheckoutSession(courseId);
    } catch (err) {
      console.error("Error creating checkout session:", err);
      toast.error("Failed to create checkout session. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to stripe checkout url
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      console.error("API error:", error);
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      onClick={purchaseCourseHandler}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Buy Course"}
    </Button>
  );
};

export default BuyCourseButton;
