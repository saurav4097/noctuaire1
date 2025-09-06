// src/app/api/dress/route.ts
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Dress2 from "@/models/Dress2";

export async function GET() {
  try {
    await connectDB();
    const groups = await Dress2.find({});
    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}