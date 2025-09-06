"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Dress {
  _id: string;
  name: string;
  image: string;
  gender: string;
  group_name: string;
}

export default function SeriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
 
  const [maleDresses, setMaleDresses] = useState<Dress[]>([]);
  const [femaleDresses, setFemaleDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"male" | "female">("male");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch male dresses
        const res1 = await fetch(`/api/dress`);
        if (!res1.ok) throw new Error("Failed to fetch male dresses");
        const data1 = await res1.json();
        setMaleDresses(data1.dresses || data1);

        // Fetch female dresses
        const res2 = await fetch(`/api/dress2`);
        if (!res2.ok) throw new Error("Failed to fetch female dresses");
        const data2 = await res2.json();
        setFemaleDresses(data2.dresses || data2);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  // Select data based on gender
  const dresses = selectedGender === "male" ? maleDresses : femaleDresses;

  // ✅ Filter dresses by search query
  const filteredDresses = dresses.filter((dress) =>
    dress.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Logo */}
      <header className="flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-sm md:text-base font-medium text-gray-600 hover:text-black">
          ← Back
        </Link>
      </header>

      {/* Logo */}
      <header className="w-full flex justify-center ">
        <Image src="/Noctuaire.png" alt="Noctuaire Logo" width={90} height={90} className="object-contain" />
      </header>

     
      {/* Search Bar */}
      <div className="flex justify-center mb-6 px-4">
        <input
          type="text"
          placeholder="Search dresses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <h2 className="text-xl  mb-5 text-gray-900 text-center font-[Playfair_Display] tracking-wide leading-snug">
          {searchQuery ? `Results for "${searchQuery}"` : "Style isn’t about wearing more — it’s about choosing what defines your presence."}
        </h2>

        {/* Gender Toggle */}
      <div className="flex justify-center gap-6 mb-6">
        
        <button
          onClick={() => setSelectedGender("male")}
          className={`px-6 py-2 rounded-lg font-medium border ${
            selectedGender === "male"
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Male
        </button>
        <button
          onClick={() => setSelectedGender("female")}
          className={`px-6 py-2 rounded-lg font-medium border ${
            selectedGender === "female"
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Female
        </button>
      </div>

      {/* All Dresses */}
      <section className="w-full">
        <h2 className="text-xl mb-5 text-gray-900 text-center font-[Playfair_Display] tracking-wide leading-snug">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : selectedGender === "male"
            ? "Explore Male Collection"
            : "Explore Female Collection"}
        </h2>

        {filteredDresses.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {filteredDresses.map((dress) => (
              <Link
                key={dress._id}
                href={`/product/${dress._id}`}
                className="relative group"
              >
                <div className="relative w-full h-120">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-2 text-sm font-medium">
                    {dress.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No dresses found</p>
        )}
      </section>
       {/* Bottom Section */}
            <section className="text-center mt-16">
              <div className="flex justify-center mb-6">
                <Image
                  src="/Noctuaire.png"
                  alt="Noctuaire Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <p className="text-lg md:text-xl italic text-gray-700 max-w-2xl mx-auto leading-relaxed">
                “Luxury isn’t about buying more — it’s about choosing the timeless
                pieces that walk with you forever.”
              </p>
            </section>
      
            <footer className="text-center py-6 bg-gray-100 border-t mt-10">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Noctuaire. All rights reserved.
              </p>
            </footer>
    </main>
  );
}
