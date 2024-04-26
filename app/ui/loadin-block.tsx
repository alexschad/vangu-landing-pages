import React from "react";
import { useFormStatus } from "react-dom";

type Props = { children: React.ReactNode };

export default function LoadingBlock({ children }: Props) {
  const { pending } = useFormStatus();

  return <>{pending ? <div>Loading...</div> : children}</>;
}
