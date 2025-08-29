import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
   request: NextRequest,
  context: any 
) {
  try {
    await connectDB();

   const productId = context.params.id; // 👈 use `context.params`
   
       const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
