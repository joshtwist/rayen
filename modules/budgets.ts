import { ZuploContext, ZuploRequest } from "@zuplo/runtime";
import { createClient } from "@supabase/supabase-js";

export async function getAll(request: ZuploRequest, context: ZuploContext) {
  return fetch("https://jsonplaceholder.typicode.com/todos");
}

export async function createBudget(
  request: ZuploRequest,
  context: ZuploContext
) {
  context.log.info("test");

  const supabase = createClient(
    "https://tfymmvjwluxidjjklkdl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmeW1tdmp3bHV4aWRqamtsa2RsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDI4NTg0MiwiZXhwIjoxOTg1ODYxODQyfQ.eCljfR7br777k7Knm-6HPXWbZzCreLAz51i42PELTnU"
  );

  const payload = await request.json();

  payload.name = request.user.sub;

  const { data, error } = await supabase.from("budgets").insert([payload]);

  if (error) {
    context.log.error(error);
    throw new Error(error);
  }

  return new Response("", { status: 201 });
}
