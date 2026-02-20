import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion, type BezierDefinition } from "framer-motion";

const smoothEase: BezierDefinition = [0.16, 1, 0.3, 1];

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, x: -20 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get in Touch
          </motion.span>
          <motion.h2
            className="section-heading text-foreground"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            CONTACT <span className="text-gradient">US</span>
          </motion.h2>
          <motion.div
            className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h3
              className="font-display text-2xl text-foreground tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              VISIT US AT REC SPORTS COMPLEX
            </motion.h3>
            <motion.p
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our sports complex at Rajalakshmi Engineering College is open to all students and faculty members. Come visit us during office hours or reach out through any of the channels below.
            </motion.p>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content: (
                    <>
                      REC Sports Complex, Rajalakshmi Engineering College<br />
                      Thandalam, Chennai - 602105<br />
                      Tamil Nadu, India
                    </>
                  ),
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: (
                    <>
                      +91 98765 43210<br />
                      +91 98765 43211
                    </>
                  ),
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: (
                    <>
                      sports@rajalakshmi.edu.in<br />
                      rec.sports@rajalakshmi.edu.in
                    </>
                  ),
                },
                {
                  icon: Clock,
                  title: "Office Hours",
                  content: (
                    <>
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </>
                  ),
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="card-sports p-5 flex items-start gap-4 group/contact"
                  variants={staggerItem}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-6 h-6 text-secondary group-hover/contact:text-violet-500 transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover/contact:text-violet-600 dark:group-hover/contact:text-violet-400 transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="card-sports overflow-hidden h-[400px] lg:h-auto"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5973866167973!2d77.5965!3d12.9341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzAyLjgiTiA3N8KwMzUnNDcuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sports Complex Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
