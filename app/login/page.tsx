import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function Page() {

  const loginWithGoogle = async () => {
    "use server";
    const origin = (await headers()).get("origin");
    const supabase = await createClient();
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      throw error;
    } else {
      redirect(data.url);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Link Tree</CardTitle>
          <CardDescription>계정에 로그인해 주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Button
              variant="outline"
              className="w-full"
              formAction={loginWithGoogle}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              구글로 로그인하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
