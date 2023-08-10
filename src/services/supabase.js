import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://oipgwnvilxqdnwxralox.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcGd3bnZpbHhxZG53eHJhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTExNjMyMjMsImV4cCI6MjAwNjczOTIyM30.kg-AtIC9-og_-qWwjJaJPRr_3HSmzU7v-i5RlO-ioWQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
