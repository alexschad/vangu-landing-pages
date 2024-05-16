import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/app/ui/button";

export function SaveButton({
  isSaved,
  setIsSaved,
}: {
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pending } = useFormStatus();

  useEffect(() => {
    setIsSaved(true);
  }, [pending, setIsSaved]);

  return (
    <>
      {isSaved ? (
        <Button type="submit" aria-disabled disabled>
          Save
        </Button>
      ) : (
        <Button type="submit">Save</Button>
      )}
    </>
  );
}
