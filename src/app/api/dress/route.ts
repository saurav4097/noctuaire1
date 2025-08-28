// src/app/api/dress/route.ts
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Dress from "@/models/Dress";

export async function GET() {
  try {
    await connectDB();
    const groups = await Dress.find({});
    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}