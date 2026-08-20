import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// تهيئة web-push بمفاتيح VAPID من متغيرات البيئة
webpush.setVapidDetails(
  Deno.env.get("VAPID_SUBJECT") ?? "mailto:madinti@example.com",
  Deno.env.get("VAPID_PUBLIC_KEY")!,
  Deno.env.get("VAPID_PRIVATE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { title, body, url } = await req.json();

    if (!title) {
      return new Response(JSON.stringify({ error: "title مطلوب" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // جلب كل الاشتراكات
    const { data: subs, error } = await supabase
      .from("push_subscriptions")
      .select("id, endpoint, p256dh, auth");

    if (error) throw error;

    const payload = JSON.stringify({ title, body: body ?? "", url: url ?? "/" });
    const results = { sent: 0, failed: 0, removed: 0 };

    for (const sub of subs ?? []) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload,
          {
            // تسليم فوري: أولوية عالية + مدة صلاحية قصيرة حتى لا يُرجَّأ التسليم
            TTL: 300,
            urgency: "high",
            topic: "madena-notify",
          }
        );
        results.sent += 1;
      } catch (err) {
        // 404/410 = الاشتراك لم يعد صالحاً، احذفه
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          await supabase.from("push_subscriptions").delete().eq("id", sub.id);
          results.removed += 1;
        } else {
          results.failed += 1;
        }
      }
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message ?? String(err) }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
