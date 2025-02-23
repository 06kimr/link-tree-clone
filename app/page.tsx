import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

async function Page() {
  return (
    <div className="container">
      <Button>HJello</Button>
    </div>
  );
}

export default Page;
