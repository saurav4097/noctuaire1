import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Dress from "@/models/Dress";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ await params here
    const { id } = await context.params;

    const dress = await Dress.findById(id);

    if (!dress) {
      return NextResponse.json({ error: "Dress not found" }, { status: 404 });
    }

    return NextResponse.json(dress);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
