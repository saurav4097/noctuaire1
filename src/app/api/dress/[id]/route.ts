import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Dress from "@/models/Dress";
import { NextRequest } from "next/server";

export async function GET(
   request: NextRequest,
  context: any 
) {
  try {
    await connectDB();

    const dressId = context.params.id; // 👈 use `context.params`

    const dress = await Dress.findById(dressId);

    if (!dress) {
      return NextResponse.json({ error: "Dress not found" }, { status: 404 });
    }

    return NextResponse.json(dress);
  } catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: "Unknown error" }, { status: 500 });
}

}
