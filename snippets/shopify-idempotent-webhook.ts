import { Request, Response } from "express";
import crypto from "crypto";

interface ShopifyWebhookPayload {
  id: number;
  order_number: number;
  customer: { email: string; phone: string };
  financial_status: string;
}

export async function handleShopifyOrderWebhook(req: Request, res: Response) {
  const shopifyHmac = req.get("X-Shopify-Hmac-Sha256");
  const rawBody = (req as any).rawBody;

  if (!shopifyHmac || !rawBody) {
    return res.status(401).json({ error: "Missing cryptographic signature" });
  }

  // 1. Verify HMAC-SHA256 signature using secret
  const generatedHash = crypto
    .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET || "")
    .update(rawBody, "utf8")
    .digest("base64");

  if (!crypto.timingSafeEqual(Buffer.from(shopifyHmac), Buffer.from(generatedHash))) {
    return res.status(401).json({ error: "Invalid webhook signature" });
  }

  const payload: ShopifyWebhookPayload = req.body;

  // 2. Idempotent state lock: Ensure order has not already been queued for dispatch
  const existingOrder = await findOrderById(payload.id);
  if (existingOrder && existingOrder.isDispatched) {
    return res.status(200).json({ message: "Order already processed (idempotent noop)" });
  }

  // 3. Queue for central warehouse fulfillment
  await queueWarehouseDispatchTicket({
    shopifyOrderId: payload.id,
    orderNumber: payload.order_number,
    status: "QUEUED_FOR_DISPATCH",
    timestamp: new Date().toISOString(),
  });

  return res.status(200).json({ success: true });
}

async function findOrderById(id: number): Promise<any> {
  return null;
}

async function queueWarehouseDispatchTicket(data: any): Promise<void> {}
