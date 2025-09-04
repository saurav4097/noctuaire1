// src/app/api/dress/route.ts
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Ads from "@/models/Ads";

export async function GET() {
  try {
    await connectDB();
    const adss = await Ads.find({});
    return NextResponse.json(adss);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}