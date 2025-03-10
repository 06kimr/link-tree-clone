import UserProfileForm from "@/components/user-profile-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const searchParams = new URLSearchParams({
    next: "/account",
  });

  if (error || !data.user) {
    redirect(`/login?${searchParams.toString()}`);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

    if (profileError) {
      throw error;
    }

    const { data: links, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile!.id);


    if (linksError) {
    throw linksError;
    }



  return (
    <div className="container">
      <UserProfileForm profile={profile} links={links}/>
    </div>
  );
}

export default Page;
