import { ReactNode } from "react";
import Card from "../Components/Simple/Card";
import Flex from "../Components/Simple/Flex";
import Heading from "../Components/Simple/Heading";

interface Props {
  heading: string;
  children: ReactNode[] | ReactNode;
}

export default function LoginLayout({ heading, children }: Props) {
  return (
    <Flex horizontal="center" col className="min-h-full py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Flex horizontal="center">
          <Heading text={heading} />
        </Flex>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md w-full">
        <Card>
          <Card.Body>{children}</Card.Body>
        </Card>
      </div>
    </Flex>
  );
}
