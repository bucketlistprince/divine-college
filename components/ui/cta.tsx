"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Your Journey at Divine College
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Take the first step towards your future. Apply now and join our vibrant academic community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent text-white border-2 border-white/50 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
