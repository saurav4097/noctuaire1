"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react"; // cross icon
import Link from "next/link";

interface Blog {
  name: string;
  image: string;
  Content: string;
  number: number;
  link: string;
  description: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // ✅ store all blogs
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null); // ✅ store clicked blog

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/blog`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setBlogs(data.blogs || data); // ✅ keep array
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  if (!blogs.length) {
    return <p className="text-center mt-20">Loading blogs...</p>;
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
    
           <header className="flex justify-between items-center px-6 py-4">
              <Link href="/" className="text-sm md:text-base font-medium text-gray-600 hover:text-black">
          ← Back
        </Link>
      </header>
          
     
           {/* Logo */}
           <header className="w-full flex justify-center ">
             <Image
               src="/Noctuaire.png"
               alt="Noctuaire Logo"
               width={90}
               height={90}
               className="object-contain"
             />
             
           </header>

      {/* Blog Grid */}
      <section className="">
        <h2 className="text-2xl font-bold mb-6 text-center font-[Playfair_Display] tracking-wide leading-snug">The Journal of Timeless Style</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {blogs.map((blog: Blog) => (
            <div
              key={blog.number}
              onClick={() => setSelectedBlog(blog)} // ✅ open popup
              className="relative h-81  shadow-md overflow-hidden cursor-pointer group"
            >
              <Image
                src={blog.image}
                alt={blog.name}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold">{blog.name}</h3>
                <p className="text-sm">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-5xl h-full md:h-[80vh] rounded-lg shadow-lg overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)} // ✅ close popup
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={28} />
            </button>

            {/* Content */}
            <div className="flex flex-col md:flex-row h-full">
              {/* Image + Buy Button */}
              <div className="relative w-full md:w-1/2 h-64 md:h-full">
                <Image
                  src={selectedBlog.image}
                  alt={selectedBlog.name}
                  fill
                  className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
                <Link
                  href={selectedBlog.link || "/buy"}
                  className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
                >
                  🛒 Buy
                </Link>
              </div>

              {/* Blog Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{selectedBlog.name}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedBlog.Content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


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
