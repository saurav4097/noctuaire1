"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // ✅ for back navigation
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaPinterest, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
 const router = useRouter();
  // ✅ typed ChangeEvent for input & textarea
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ typed FormEvent for form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("✅ Query sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("❌ Failed to send. Try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
     {/* Top Logo */}
      <header className="flex justify-between items-center px-6 py-4">  
        <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 bg-blue-200 hover:bg-blue-300 text-gray-800 px-4 py-2 rounded-lg shadow-md transition"
      >
        ⬅ Back
      </button>
      </header>

      <header className="w-full flex justify-center py-6">
        <Image
          src="/Noctuaire.png"
          alt="Noctuaire Logo"
          width={90}
          height={90}
          className="object-contain"
        />
      </header>


      {/* Description */}
      <section className="text-center my-6 px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide font-serif">
          Contact Us
        </h1>
        <p className="mt-3 text-lg text-gray-700 italic">
          Let’s stay connected and create something timeless together.
        </p>
      </section>

      {/* Social Icons */}
      <section className="flex justify-center gap-6 my-6 text-2xl">
        <a href="https://www.instagram.com/noctuaire1" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-600 transition" />
        </a>
        <a href="https://in.pinterest.com/noctuaire1" target="_blank" rel="noopener noreferrer">
          <FaPinterest className="hover:text-red-600 transition" />
        </a>
        
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto px-6 my-10">
        <form onSubmit={handleSubmit}  className="space-y-4">
          <input
             type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
          />
          <input
              type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
          />
          <textarea
           name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-black"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
         {status && <p className="mt-4 text-center text-sm">{status}</p>}
      </section>

           {/* Story Section */}
      <section className="w-full bg-gray-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-wide">
            Our Story
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light">
            We don’t just sell outfits — we craft experiences.  
            Born with a single vision: to merge timeless elegance with modern boldness.  
            Fashion here is not about chasing trends, it’s about owning a presence that defines you.  
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light">
            Every piece is designed to move with you, to stay with you,  
            and to make you unforgettable. It’s for those who know class is never loud — it’s felt.  
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light">
            When you buy here, you’re not just wearing clothes —  
            you’re investing in aura, in quiet power, in elegance that speaks without a word.  
          </p>

          <div className="pt-8 space-x-6">
            <a
              href="#"
              className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-200 transition"
            >
              Explore Collection
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-white text-white rounded-full font-medium text-lg hover:bg-gray-800 transition"
            >
              Own Your Class
            </a>
          </div>
        </div>
      </section>



      {/* Logo + Classy Line */}
      <section className="text-center mt-12 px-6">
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
          “Where style finds its soul, and every step reflects your elegance.”
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 border-t mt-10">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Noctuaire. All rights reserved.
        </p>
      </footer>
    </main>
  );
}