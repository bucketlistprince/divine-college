"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Award, TrendingUp } from "lucide-react"

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
    title: "Quality Education",
    description: "Expert faculty and modern curriculum designed for success"
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-600" />,
    title: "Diverse Community",
    description: "Rich cultural environment fostering global perspectives"
  },
  {
    icon: <Award className="w-8 h-8 text-indigo-600" />,
    title: "Excellence",
    description: "Recognized for outstanding academic achievements"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
    title: "Career Growth",
    description: "Strong industry connections and placement support"
  }
]

export function Features() {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="absolute inset-0 bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Why Choose Divine College?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide an enriching educational experience that prepares you for real-world success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur opacity-5 group-hover:opacity-20 transition duration-300" />
              <div className="relative bg-white rounded-2xl p-8 ring-1 ring-gray-100 border border-gray-100">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-102 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
