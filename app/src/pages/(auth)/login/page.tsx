import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./_components/login-form";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const location = useLocation();

  const handleLoginWithGoogle = () => {
    window.open(`http://localhost:3500/api/auth/google`, "_self");
  };

  return (
    <div className="h-screen w-full grid place-content-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome Back 👋</CardTitle>
          <CardDescription>
            Sign in to access your personal account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <span className="text-sm">
            Don't have an Account?
            <Link
              to="/register"
              state={{ from: location.state }}
              className="text-primary underline"
            >
              Register
            </Link>
          </span>

          <div className="flex gap-1 w-full items-center">
            <Separator className="flex-1 w-0" />
            <span>OR</span>
            <Separator className="flex-1 w-0" />
          </div>

          <Button onClick={handleLoginWithGoogle}>Continue with google</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
