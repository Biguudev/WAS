let body = $response.body || "";
let obj;

try {
  obj = JSON.parse(body);
} catch (e) {
  console.log("parse error");
  $done({ body });
}

obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};

const now = new Date();
const purchaseDate = now.toISOString();
const expiresDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

let product_id = "wa.story.premium.month";

const entitlement =
  obj.subscriber.entitlements &&
  obj.subscriber.entitlements.Premium;

if (entitlement && entitlement.product_identifier) {
  product_id = entitlement.product_identifier;
} else {
  const subKeys = Object.keys(obj.subscriber.subscriptions || {});
  if (subKeys.length > 0) product_id = subKeys[0];
}

obj.request_date = obj.request_date || purchaseDate;
obj.request_date_ms = obj.request_date_ms || Date.now();

obj.subscriber.entitlements["Premium"] = {
  "expires_date": expiresDate,
  "grace_period_expires_date": null,
  "product_identifier": product_id,
  "purchase_date": purchaseDate
};

obj.subscriber.subscriptions[product_id] = {
  "auto_resume_date": null,
  "billing_issues_detected_at": null,
  "display_name": null,
  "expires_date": expiresDate,
  "grace_period_expires_date": null,
  "is_sandbox": false,
  "management_url": "https://apps.apple.com/account/subscriptions",
  "original_purchase_date": purchaseDate,
  "ownership_type": "PURCHASED",
  "period_type": "normal",
  "price": {
    "amount": 0.0,
    "currency": "USD"
  },
  "purchase_date": purchaseDate,
  "refunded_at": null,
  "store": "app_store",
  "unsubscribe_detected_at": null
};

$done({ body: JSON.stringify(obj) });