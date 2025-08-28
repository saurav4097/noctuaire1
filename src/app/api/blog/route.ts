// src/app/api/dress/route.ts
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}