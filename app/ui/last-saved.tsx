import { useState, useEffect } from "react";
import { humanReadableDate } from "@/app/lib/utils";

export function LastModified({ modifiedDate }: { modifiedDate: Date }) {
  const [modified, setModified] = useState(humanReadableDate(modifiedDate));

  useEffect(() => {
    const interval = setInterval(
      () => setModified(humanReadableDate(modifiedDate)),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [modifiedDate]);

  return <div className="flex items-center px-4">{modified}</div>;
}
