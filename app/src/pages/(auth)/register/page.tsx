import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./_components/register-form";
import { Link, useLocation } from "react-router-dom";

const RegisterPage = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-full grid place-content-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Join our App Today 💝</CardTitle>
          <CardDescription>Sign up to start your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <span className="text-sm">
            Already have an Account?
            <Link
              to="/login"
              state={{ from: location.state }}
              className="text-primary underline"
            >
              login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
