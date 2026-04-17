let body = $response.body || "";
let obj;

try {
  obj = JSON.parse(body);
} catch (e) {
  console.log("mapping parse error");
  $done({ body });
}

obj.product_entitlement_mapping = obj.product_entitlement_mapping || {};

obj.product_entitlement_mapping["wa.story.premium.month"] = {
  entitlements: ["Premium"],
  product_identifier: "wa.story.premium.month"
};

obj.product_entitlement_mapping["wa.story.premium.week"] = {
  entitlements: ["Premium"],
  product_identifier: "wa.story.premium.week"
};

obj.product_entitlement_mapping["wa.story.premium.year"] = {
  entitlements: ["Premium"],
  product_identifier: "wa.story.premium.year"
};

obj.product_entitlement_mapping["wa.story.premium.new.monthly"] = {
  entitlements: ["Premium"],
  product_identifier: "wa.story.premium.new.monthly"
};

obj.product_entitlement_mapping["wa.story.premium.new.weekly"] = {
  entitlements: ["Premium"],
  product_identifier: "wa.story.premium.new.weekly"
};

$done({ body: JSON.stringify(obj) });
