"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import { PageHeader } from "@/components/ui/page-header"

const values = [
  { title: "Academic Excellence", description: "Commitment to highest standards of education" },
  { title: "Spiritual Growth", description: "Nurturing faith and personal development" },
  { title: "Community Service", description: "Making positive impact in society" },
  { title: "Innovation", description: "Embracing new ideas and technologies" },
]

export default function AboutPage() {
  return (
    <>

      <PageHeader 
        title="About Divine College"
        description="Empowering minds and transforming lives through quality education"
      />

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/campus-life.jpg"
                alt="Campus Life"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600">
                  Divine College is dedicated to providing exceptional education that nurtures intellectual growth,
                  fosters spiritual development, and prepares students for leadership in a global society.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-600">
                  To be a leading institution of higher learning, recognized for academic excellence,
                  spiritual formation, and commitment to producing graduates who make positive contributions to society.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in providing exceptional education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our History</h2>
              <p className="text-lg text-gray-600">
                Founded with a vision to provide quality education rooted in spiritual values,
                Divine College has grown to become a respected institution with a rich heritage
                of academic excellence and community engagement.
              </p>
              <p className="text-lg text-gray-600">
                Over the years, we have expanded our programs, enhanced our facilities,
                and strengthened our commitment to providing an education that prepares
                students for success in their chosen fields while fostering their
                spiritual growth and personal development.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/college-history.jpeg"
                alt="College History"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
