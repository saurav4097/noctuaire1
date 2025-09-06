import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Dress2 from "@/models/Dress2";
import { NextRequest } from "next/server";

export async function GET(
   request: NextRequest,
  context: any 
) {
  try {
    await connectDB();

    const dress2Id = context.params.id; // 👈 use `context.params`

    const dress2 = await Dress2.findById(dress2Id);

    if (!dress2) {
      return NextResponse.json({ error: "Dress not found" }, { status: 404 });
    }

    return NextResponse.json(dress2);
  } catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: "Unknown error" }, { status: 500 });
}

}
